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
    vec2 wq = vec2(vnoise2(p * 2.21 + ph), vnoise2(p * 2.21 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.21 + 2.80 * wq + vec2(1.7, 9.2) + t * 0.42),
                   vnoise2(p * 2.21 + 3.24 * wq + vec2(8.3, 2.8) - t * 1.11));
    v = vnoise2(p * 2.21 + 2.21 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.77 + ph), vnoise2(p * 2.77 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.77 + 3.75 * wq + vec2(1.7, 9.2) + t * 1.04),
                   vnoise2(p * 2.77 + 1.70 * wq + vec2(8.3, 2.8) - t * 0.79));
    v = vnoise2(p * 2.77 + 1.50 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.20;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 14.45 - t * 5.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.27 / wf * sin(wf * 1.99 * q1.y + time * 1.05); q1.y += 0.49 / wf * cos(wf * 2.71 * q1.x + time * 0.73); }
	q1 = (floor(q1 * 8.6) + 0.5) / 8.6;
	q2 = rot2(length(q2) * -3.31 + time * 0.99) * q2;
	{ float fr = length(q2); q2 *= 1.0 + -0.59 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.24);
	float d3 = fieldC(q3, time, 1.38);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.31 + time * 0.21, vec3(0.59, 0.45, 0.43), vec3(0.34, 0.30, 0.32), vec3(1.10, 0.92, 1.14), vec3(0.69, 0.16, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
