uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.38 + vec2(t * 2.40, -t * 2.12) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.74) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 1.37 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.12 * sin(time * 4.75);
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.61, lr * 2.51 + time * 0.94); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.45 / wf * sin(wf * 2.65 * q2.y + time * 1.13); q2.y += 0.37 / wf * cos(wf * 3.17 * q2.x + time * 1.22); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.19, length(q2) * 2.56 - time * 0.28); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.78);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.19 + time * 0.60);
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
