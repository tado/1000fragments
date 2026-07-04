uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.72 - t * 1.22;
    v = sin(floor(lv * 3.1) / 3.1 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 2.64 * sin(t * 1.39) + t * 4.90 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.43 + sin(p.y * 4.99 + t * 3.07) * 1.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.31; }
	q1.y += sin(q1.x * 7.24 + time * 3.57) * 0.14;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.77, length(q2) * 3.75 - time * 0.85); }
	for(int fo = 0; fo < 2; fo++){ q3 = abs(q3) - 0.49; q3 = rot2(1.21) * q3; }
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.96; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.41);
	float d3 = fieldC(q3, time, 1.68);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.70, 0.80, 0.71) * (0.11 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
