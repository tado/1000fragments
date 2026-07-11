uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.26 + sin(p.y * 4.27 + t * 5.80) * 4.40 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.24 * cos(sa * 5.0 + t * 2.17 + ph);
    v = sin((sr - petal) * 7.84);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.50 / wf * sin(wf * 2.59 * q1.y + time * 1.19); q1.y += 0.40 / wf * cos(wf * 3.30 * q1.x + time * 0.85); }
	q2 *= 1.67;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.79, lr * 1.44 + time * -0.75); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.01, 0.37), vec3(0.99, 0.58, 0.99), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
