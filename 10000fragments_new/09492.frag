uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.03);
    float gsh = hash21(vec2(grow, floor(t * 9.75))) - 0.5;
    float gx = p.x + gsh * 1.17;
    v = sin(gx * 19.84 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.27));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.42);
    float gsh = hash21(vec2(grow, floor(t * 5.59))) - 0.5;
    float gx = p.x + gsh * 0.76;
    v = sin(gx * 6.32 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.05));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.01, length(q1) * 2.82 - time * 0.85); }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.38, lr * 1.45 + time * -0.31); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.49, lr * 2.52 + time * -0.32); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d = d1 * d2;
	vec3 col = vec3(0.73, 0.60, 0.42) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
