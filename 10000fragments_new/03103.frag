uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.03;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.55; kp = rot2(1.93) * kp; kp *= 1.20; }
    v = sin(kp.y * 3.48 - t * 3.69 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 5.04 * sin(t * 0.97) + t * 5.93 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.45;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 21.50 - t * 4.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.45; q1 = rot2(1.21) * q1; }
	q2 = abs(q2) - 0.47;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.78);
	float d3 = fieldC(q3, time, 1.53);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.02, vec3(0.44, 0.59, 0.57), vec3(0.34, 0.40, 0.30), vec3(0.83, 0.87, 1.22), vec3(0.71, 0.20, 0.61));
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
