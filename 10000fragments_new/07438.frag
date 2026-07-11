uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.27 + sin(p.y * 2.56 + t * 1.33) * 1.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.23 + t * 3.36 + ph) * 0.7;
    float wb = sin(p.y * 15.81 - t * 2.00 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.71;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.86;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.09 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(2.72) * q2;
	q3 = rot2(0.96) * q3;
	{ float fr = length(q3); q3 *= 1.0 + 0.65 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d3 = fieldC(q3, time, 0.53);
	d2 = d2 * d3;
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.21, 0.04), vec3(0.81, 1.00, 0.61), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
