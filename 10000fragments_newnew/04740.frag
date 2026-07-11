uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 6.80 * sin(t * 1.11) + t * 3.01 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.26 * pow(abs(cos(ra * 6.0 + t * 2.79)), 1.71);
    v = sin((rr - pet) * 13.54 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.99 + vec2(t * 1.88, -t * 1.30) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.19 * sin(time * 2.36);
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.58; q2 = rot2(2.02) * q2; }
	q2 += vec2(-0.59, -0.03) * sin(length(q2) * 3.73 - time * 1.24) * 0.16;
	q3 *= 2.46;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.98, length(q3) * 6.00 - time * 0.75); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d3 = fieldC(q3, time, 1.08);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = vec3(0.41, 0.17, 0.65) * (0.12 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
