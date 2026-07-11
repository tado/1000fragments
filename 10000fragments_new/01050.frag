uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.12;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.69; kp = rot2(0.83) * kp; kp *= 1.44; }
    v = sin(kp.y * 1.09 - t * 1.68 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.09;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.54; kp = rot2(1.91) * kp; kp *= 1.17; }
    v = sin(kp.y * 1.83 - t * 1.50 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.50;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.48 - t * 3.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.53; q1 = rot2(1.16) * q1; }
	q1 = rot2(q1.y * -1.02 + time * 0.50) * q1;
	q2 = rot2(length(q2) * 3.44 + time * 0.76) * q2;
	q3.x += sin(q3.y * 5.37 + time * 1.35) * 0.30;
	q3 += vec2(-0.46, -0.16) * sin(length(q3) * 4.94 - time * 2.42) * 0.14;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d3 = fieldC(q3, time, 1.64);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.46, 0.56, 0.27) * (0.09 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
