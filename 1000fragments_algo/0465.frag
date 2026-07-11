uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.03;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.84 - t * 3.85 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 4.84 * sin(t * 1.45) + t * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.43; q1 = rot2(0.33) * q1; }
	q1 += vec2(0.23, -0.36) * sin(length(q1) * 4.48 - (time * 0.79) * 2.01) * 0.19;
	float d1 = fieldA(q1, (time * 0.79), 0.0);
	float d2 = fieldB(q2, (time * 0.79), 0.16);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.79) * 0.84));
	vec3 col = palette((d) * 1.18 + (time * 0.79) * 0.08, vec3(0.33, 0.23, 0.30), vec3(0.15, 0.15, 0.13), vec3(0.55, 0.63, 0.42), vec3(0.86, 0.34, 0.73));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.985, 0.998) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
