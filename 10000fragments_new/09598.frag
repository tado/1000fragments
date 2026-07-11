uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.64 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.18 + t * 3.18 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.58, t * 0.41 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.78 + sin(p.y * 3.12 + t * 1.67) * 3.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.36; q1 = rot2(2.07) * q1; }
	q2 = fract(q2 * 2.55) - 0.5;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.98, lr * 2.04 + time * 0.74); }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.17, lr * 2.82 + time * -0.42); }
	q3 = rot2(q3.y * 3.32 + time * 0.48) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d3 = fieldC(q3, time, 0.39);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = vec3(0.24, 0.60, 0.89) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 2.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
