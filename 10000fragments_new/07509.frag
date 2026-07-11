uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.46 + ph), vnoise2(p * 2.46 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.46 + 1.82 * wq + vec2(1.7, 9.2) + t * 1.04),
                   vnoise2(p * 2.46 + 2.49 * wq + vec2(8.3, 2.8) - t * 0.80));
    v = vnoise2(p * 2.46 + 2.78 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 26.59 - t * 6.64 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 37.62 - t * 4.19 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.14 * sin(mf + 3.0) + ph), cos(t * 1.13 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d3 = fieldC(q3, time, 1.57);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.43));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.59 + time * 0.67);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
