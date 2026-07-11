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
    vec2 kp = p * 1.94;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.57; kp = rot2(0.44) * kp; kp *= 1.37; }
    v = sin(kp.x * 3.71 - t * 3.45 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.81, t * 0.76 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.18 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.86); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.25 / wf * sin(wf * 1.82 * q1.y + time * 1.88); q1.y += 0.43 / wf * cos(wf * 2.77 * q1.x + time * 1.08); }
	q1.y += sin(q1.x * 6.55 + time * 1.21) * 0.16;
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.34; q3 = rot2(1.41) * q3; }
	q3 *= 1.77;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d3 = fieldC(q3, time, 0.98);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = palette(d * 0.45 + time * 0.21, vec3(0.53, 0.58, 0.45), vec3(0.44, 0.50, 0.46), vec3(1.30, 1.00, 0.80), vec3(0.21, 0.01, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
