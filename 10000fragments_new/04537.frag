uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.52 * jf)) * 0.54;
        xs += sin(length(p - im) * 138.31 - t * 13.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.55 * sin(mf + 3.0) + ph), cos(t * 2.16 * cos(mf + 3.0) + ph));
        ms += 0.021 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.78 + ph), vnoise2(p * 2.78 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.78 + 2.66 * wq + vec2(1.7, 9.2) + t * 0.39),
                   vnoise2(p * 2.78 + 3.33 * wq + vec2(8.3, 2.8) - t * 0.77));
    v = vnoise2(p * 2.78 + 1.51 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2.y += sin(q2.x * 7.61 + time * 1.09) * 0.10;
	q3 = rot2(length(q3) * -3.67 + time * 1.32) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.35);
	float d3 = fieldC(q3, time, 0.53);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.04, 0.12), vec3(0.94, 0.94, 0.75), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
