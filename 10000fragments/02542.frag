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
    float bx = p.x + (vnoise2(vec2(p.y * 2.69, t * 1.75)) - 0.5) * 1.14;
    v = exp(-abs(bx) * 6.14) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.10 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.25); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.95 + t * 2.90 + ph) * 0.7;
    float wb = sin(p.y * 15.22 - t * 3.95 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(0.55) * q2;
	q2 *= 1.0 + 0.23 * sin(time * 2.99);
	q3 = abs(q3) - 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d3 = fieldC(q3, time, 1.71);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.87 + time * 0.29, vec3(0.55, 0.58, 0.41), vec3(0.46, 0.44, 0.49), vec3(1.18, 1.12, 0.87), vec3(0.00, 0.36, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
