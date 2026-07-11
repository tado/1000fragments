uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.66 - t * 4.69 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.20 + vec2(t * 1.35, -t * 1.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 23.4) + 0.5) / 23.4;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.02, lr * 2.66 + time * 0.79); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.27);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.62));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.15, 0.38), vec3(0.86, 0.67, 0.48), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
