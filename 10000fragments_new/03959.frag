uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.34 * pow(abs(cos(ra * 2.0 + t * 2.99)), 1.00);
    v = sin((rr - pet) * 16.07 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.33 + vec2(t * 1.05, -t * 0.47) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.40 + time * 0.65) * q1;
	q1 = (floor(q1 * 8.6) + 0.5) / 8.6;
	{ float fr = length(q2); q2 *= 1.0 + -0.63 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.32));
	vec3 col = vec3(0.89, 0.29, 0.21) * (0.23 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
