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
    vec2 kp = p * 1.72;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.62) * kp; kp *= 1.17; }
    v = sin(kp.y * 2.72 - t * 4.89 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.21;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.72 - t * 3.34 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.44 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.65); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -0.70) * q1;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.16; q1 = rot2(1.50) * q1; }
	q2.x += sin(q2.y * 3.17 + time * 2.94) * 0.40;
	q2 = rot2(q2.y * 1.45 + time * 0.25) * q2;
	q3 = rot2(2.76) * q3;
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d3 = fieldC(q3, time, 0.47);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.50, 0.73, 0.19) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
