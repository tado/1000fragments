uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.18 * cos(sa * 5.0 + t * 1.11 + ph);
    v = sin((sr - petal) * 9.73);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.80 + vec2(t * 0.60, -t * 1.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.56 + t * 2.53 + ph) * 0.7;
    float wb = sin(p.y * 5.54 - t * 0.55 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.47;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.72 * fr * fr; }
	{ float fr = length(q3); q3 *= 1.0 + 0.79 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.51);
	float d3 = fieldC(q3, time, 1.54);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.29 + time * 0.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
