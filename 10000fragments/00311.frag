uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.18 * cos(sa * 5.0 + t * 2.38 + ph);
    v = sin((sr - petal) * 13.15);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.87 - t * 1.31;
    v = sin(floor(lv * 4.2) / 4.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.34) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.29 / wf * sin(wf * 1.88 * q1.y + time * 1.35); q1.y += 0.41 / wf * cos(wf * 2.35 * q1.x + time * 1.90); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.19, lr * 2.17 + time * -0.49); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.62, 1.24, 1.41) + vec3(0.21, 0.11, 0.07);
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
