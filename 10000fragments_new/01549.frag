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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.54 + t * 0.77 + ph) * 0.7;
    float wb = sin(p.y * 13.66 - t * 0.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.33;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.48 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.04); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 7.4) + 0.5) / 7.4;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.86, lr * 2.96 + time * -0.34); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d = d1 * d2;
	vec3 col = palette(d * 0.50 + time * 0.08, vec3(0.44, 0.50, 0.40), vec3(0.31, 0.47, 0.34), vec3(0.87, 1.22, 1.18), vec3(0.74, 0.17, 0.90));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.41 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
