uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.40 + t * 3.69 + ph) + sin(p.y * 7.84 - t * 5.32 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.97 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.18 + t * 2.39 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.09 + vec2(t * 1.05, -t * 1.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.42, lr * 1.25 + time * -0.41); }
	q1 = fract(q1 * 2.03) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d3 = fieldC(q3, time, 1.09);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.29, vec3(0.45, 0.47, 0.55), vec3(0.41, 0.39, 0.41), vec3(1.08, 1.06, 0.73), vec3(0.38, 0.93, 0.76));
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
