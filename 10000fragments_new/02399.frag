uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.47);
    float gsh = hash21(vec2(grow, floor(t * 6.56))) - 0.5;
    float gx = p.x + gsh * 1.18;
    v = sin(gx * 8.89 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.80));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.23 + t * 3.03 + ph) * 0.7;
    float wb = sin(p.y * 15.62 - t * 3.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.15 * cos(sa * 9.0 + t * 0.59 + ph);
    v = sin((sr - petal) * 19.27);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 2.39 + time * 0.22) * q1;
	q1 = abs(q1) - 0.21;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.76, lr * 1.83 + time * -0.83); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d3 = fieldC(q3, time, 1.42);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.51 + time * 0.29);
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
