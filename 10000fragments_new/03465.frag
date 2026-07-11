uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.90;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.16 - t * 3.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.17;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.70; kp = rot2(0.80) * kp; kp *= 1.43; }
    v = sin(kp.y * 2.12 - t * 1.14 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.24 + t * 1.33 + ph) + sin(p.y * 2.76 - t * 1.33 + ph)
        + sin((p.x + p.y) * 11.26 + t * 1.33 + ph) + sin(length(p) * 9.19 - t * 1.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	{ q1 = vec2(atan(q1.y, q1.x) * 2.34, length(q1) * 2.94 - time * 0.67); }
	q3 = fract(q3 * 1.07) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d3 = fieldC(q3, time, 1.09);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.29, 0.28), vec3(0.73, 0.80, 0.55), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
