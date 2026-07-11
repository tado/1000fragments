uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.43 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.22 + t * 2.27 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.29 + t * 5.69 + ph) + sin(p.y * 17.00 - t * 1.77 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.43, lr * 2.40 + time * 1.00); }
	q1 = rot2(0.54) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.74 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.25 / wf * sin(wf * 1.80 * q2.y + time * 2.04); q2.y += 0.45 / wf * cos(wf * 2.73 * q2.x + time * 2.20); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.02);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.36 + time * 0.16, vec3(0.49, 0.49, 0.58), vec3(0.33, 0.43, 0.40), vec3(0.71, 1.07, 0.77), vec3(0.93, 0.67, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
