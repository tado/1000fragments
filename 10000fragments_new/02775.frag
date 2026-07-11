uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.34;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.45 - t * 3.75 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.29;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.76; kp = rot2(0.47) * kp; kp *= 1.36; }
    v = sin(kp.x * 1.72 - t * 1.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.39 * fr * fr; }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.69, lr * 1.31 + time * 0.41); }
	q2 = abs(q2) - 0.70;
	q2 = rot2(q2.y * 2.26 + time * 0.67) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.38);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.18, vec3(0.49, 0.53, 0.42), vec3(0.40, 0.48, 0.35), vec3(1.03, 0.94, 1.06), vec3(0.54, 0.37, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
