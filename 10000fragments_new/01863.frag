uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.52 + vec2(t * 0.50, -t * 0.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.94 + vec2(t * 1.63, -t * 1.75) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.41 + t * 3.74 + ph) * 0.7;
    float wb = sin(p.y * 12.34 - t * 2.64 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.51;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.48 / wf * sin(wf * 3.57 * q1.y + time * 0.98); q1.y += 0.34 / wf * cos(wf * 3.76 * q1.x + time * 1.14); }
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.23; q2 = rot2(0.79) * q2; }
	{ q2 = vec2(atan(q2.y, q2.x) * 2.56, length(q2) * 2.49 - time * 0.30); }
	{ float fr = length(q3); q3 *= 1.0 + -0.75 * fr * fr; }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.86, lr * 2.14 + time * 0.51); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.76);
	float d3 = fieldC(q3, time, 0.96);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = vec3(0.59, 0.90, 0.55) * (0.19 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
