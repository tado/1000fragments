uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 3.21 * sin(t * 0.54) + t * 3.00 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.20 * cos(sa * 4.0 + t * 1.59 + ph);
    v = sin((sr - petal) * 9.91);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.67, t * 0.99 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.22, lr * 2.95 + time * -0.97); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.26 / wf * sin(wf * 3.90 * q1.y + time * 0.81); q1.y += 0.38 / wf * cos(wf * 2.78 * q1.x + time * 1.60); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.26 / wf * sin(wf * 3.29 * q2.y + time * 1.02); q2.y += 0.44 / wf * cos(wf * 1.57 * q2.x + time * 1.13); }
	{ float fr = length(q2); q2 *= 1.0 + 0.59 * fr * fr; }
	q3 += vec2(0.46, 0.14) * sin(length(q3) * 2.96 - time * 2.12) * 0.37;
	q3 = fract(q3 * 2.48) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.91);
	float d3 = fieldC(q3, time, 1.14);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.16));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.55 + time * 0.68);
	col = fract(col * 1.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
