uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.37);
    float gsh = hash21(vec2(grow, floor(t * 2.61))) - 0.5;
    float gx = p.x + gsh * 0.92;
    v = sin(gx * 12.04 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.32));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.92 + t * 2.86 + ph) + sin(p.y * 4.69 - t * 2.86 + ph)
        + sin((p.x + p.y) * 5.27 + t * 2.86 + ph) + sin(length(p) * 10.29 - t * 2.86 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.16 + t * 2.10 + ph) + sin(p.y * 12.75 - t * 2.39 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.18, lr * 1.81 + time * 0.51); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d3 = fieldC(q3, time, 1.15);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.74, 0.41, 0.44) * (0.17 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
