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
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.79 + ph), sin(lt * 2.0 + t * 0.62)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.46) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.42 + ph), vnoise2(p * 3.42 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.42 + 1.71 * wq + vec2(1.7, 9.2) + t * 0.74),
                   vnoise2(p * 3.42 + 2.46 * wq + vec2(8.3, 2.8) - t * 0.32));
    v = vnoise2(p * 3.42 + 2.58 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 1.42) - 0.5;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.18; q2 = rot2(1.29) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d = max(d1, d2);
	vec3 col = vec3(0.67, 0.22, 0.36) * (0.08 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
