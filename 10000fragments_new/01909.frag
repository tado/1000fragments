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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.27 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.32); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.50 + t * 1.64 + ph) * 0.7;
    float wb = sin(p.y * 14.33 - t * 3.13 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.23;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.15 * pow(abs(cos(ra * 5.0 + t * 1.92)), 2.47);
    v = sin((rr - pet) * 21.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 7.73 + time * 3.95) * 0.33;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.21, lr * 1.93 + time * 0.28); }
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.27; q2 = rot2(1.88) * q2; }
	q3 = (floor(q3 * 23.8) + 0.5) / 23.8;
	q3 = rot2(q3.y * -2.34 + time * 0.49) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.18);
	float d3 = fieldC(q3, time, 1.31);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.50 + time * 0.07, vec3(0.46, 0.60, 0.52), vec3(0.49, 0.46, 0.40), vec3(1.19, 1.12, 1.33), vec3(0.06, 0.07, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
