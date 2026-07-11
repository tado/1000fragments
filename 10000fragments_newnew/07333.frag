uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.27 + t * 0.68 + ph) * 0.7;
    float wb = sin(p.y * 10.39 - t * 3.34 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.72;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 23.07 - t * 1.56 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 31.09 - t * 6.65 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.60 + t * 0.79 + ph) + sin(p.y * 7.31 - t * 4.15 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.98;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.50 / wf * sin(wf * 2.05 * q2.y + time * 1.98); q2.y += 0.30 / wf * cos(wf * 3.92 * q2.x + time * 1.22); }
	q2 *= 2.87;
	q3 = sin(q3 * 2.58 + time * 1.99) * 1.14;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.24, lr * 2.02 + time * -0.69); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d3 = fieldC(q3, time, 1.81);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.23, vec3(0.55, 0.43, 0.59), vec3(0.44, 0.46, 0.48), vec3(0.71, 1.34, 1.02), vec3(0.56, 0.46, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
