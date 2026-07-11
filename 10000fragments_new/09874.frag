uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.20 * cos(sa * 3.0 + t * 1.75 + ph);
    v = sin((sr - petal) * 10.53);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.86 + vec2(t * 1.06, -t * 0.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.76, lr * 2.98 + time * 0.43); }
	q1 = abs(q1);
	q2 = abs(q2) - 0.77;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.38, 0.31, 0.51), vec3(0.98, 0.63, 0.67), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
