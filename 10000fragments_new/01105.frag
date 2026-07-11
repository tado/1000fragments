uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.60 + vec2(t * 2.88, -t * 1.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.49 + vec2(t * 2.83, -t * 0.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.14 + t * 5.82 + ph) + sin(p.y * 14.78 - t * 4.38 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(0.38) * q1;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.04, lr * 2.60 + time * 0.96); }
	q3.x += sin(q3.y * 6.06 + time * 2.84) * 0.37;
	q3 = rot2(2.73) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.06);
	float d3 = fieldC(q3, time, 0.82);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.22, 0.23, 0.76) * (0.17 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
