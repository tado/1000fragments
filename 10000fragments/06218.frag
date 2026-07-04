uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.44 + 0.33 * pow(abs(cos(ra * 6.0 + t * 0.84)), 2.12);
    v = sin((rr - pet) * 16.68 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.11, t * 0.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.56, lr * 2.41 + time * 0.60); }
	q1 *= 3.07;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.74);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.55));
	vec3 col = vec3(0.68, 0.54, 0.36) * (0.11 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
