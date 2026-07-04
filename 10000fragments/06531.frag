uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.99 + t * 4.17 + ph) + sin(p.y * 10.25 - t * 4.17 + ph)
        + sin((p.x + p.y) * 2.38 + t * 4.17 + ph) + sin(length(p) * 15.58 - t * 4.17 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.52;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 8.56 - t * 1.31 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 26.90 - t * 6.67 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 26.95 - t * 3.67 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 2.97 + time * 0.21) * q1;
	q2 = rot2(q2.y * 3.70 + time * 0.71) * q2;
	q2 = abs(q2) - 0.68;
	{ float fr = length(q3); q3 *= 1.0 + -0.39 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.65);
	float d3 = fieldC(q3, time, 1.18);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.15 + time * 0.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
