uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.82 - t * 7.17 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.44 + sin(p.y * 2.51 + t * 5.41) * 4.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.46; q1 = rot2(2.59) * q1; }
	{ float fr = length(q1); q1 *= 1.0 + -0.27 * fr * fr; }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.22, lr * 2.88 + time * 0.68); }
	q2 *= 2.05;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.64);
	float d = d1 * d2;
	vec3 col = vec3(0.25, 0.55, 0.35) * (0.19 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
