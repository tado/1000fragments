uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.15 * pow(abs(cos(ra * 4.0 + t * 1.14)), 1.18);
    v = sin((rr - pet) * 14.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.33 - t * 3.64 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.61 + t * 5.17 + ph) + sin(p.y * 2.69 - t * 4.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.24 * fr * fr; }
	q2 += vec2(0.00, -0.06) * sin(length(q2) * 5.73 - time * 0.85) * 0.18;
	q3.y += sin(q3.x * 2.78 + time * 2.00) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d3 = fieldC(q3, time, 0.96);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = vec3(0.65, 0.32, 0.72) * (0.21 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.85 + 0.10 * sin(gl_FragCoord.y * 1.34 + time * 11.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
