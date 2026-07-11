uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.82 + t * 2.62 + ph) + sin(p.y * 5.72 - t * 2.62 + ph)
        + sin((p.x + p.y) * 7.06 + t * 2.62 + ph) + sin(length(p) * 16.66 - t * 2.62 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.00) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.45) - 0.5;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.74, lr * 2.64 + time * 0.80); }
	q2 = fract(q2 * 2.81) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.50 / wf * sin(wf * 3.63 * q2.y + time * 1.23); q2.y += 0.22 / wf * cos(wf * 3.29 * q2.x + time * 1.19); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.97);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.09 + time * 0.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
