uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.37);
    float gsh = hash21(vec2(grow, floor(t * 2.86))) - 0.5;
    float gx = p.x + gsh * 0.92;
    v = sin(gx * 19.99 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.60));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.30 * cos(sa * 7.0 + t * 2.32 + ph);
    v = sin((sr - petal) * 12.96);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.26) - 0.5;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.17, lr * 1.67 + time * 0.45); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.20, 0.44), vec3(0.67, 0.85, 0.59), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
