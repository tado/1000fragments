uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.21);
    float gsh = hash21(vec2(grow, floor(t * 8.41))) - 0.5;
    float gx = p.x + gsh * 0.37;
    v = sin(gx * 6.00 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.87));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.31 + t * 0.59 + ph) + sin(p.y * 6.07 - t * 0.59 + ph)
        + sin((p.x + p.y) * 5.76 + t * 0.59 + ph) + sin(length(p) * 15.04 - t * 0.59 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.47 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.41 + t * 2.87 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 29.3) + 0.5) / 29.3;
	q3 = rot2(2.40) * q3;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.63, lr * 1.43 + time * 0.25); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d3 = fieldC(q3, time, 1.62);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = vec3(0.60, 0.68, 0.70) * (0.20 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
