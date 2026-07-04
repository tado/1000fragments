uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.71) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.86 + vec2(t * 2.06, -t * 1.20) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.45 / wf * sin(wf * 2.03 * q1.y + time * 1.44); q1.y += 0.47 / wf * cos(wf * 3.55 * q1.x + time * 1.62); }
	q1 += vec2(0.80, -0.14) * sin(length(q1) * 2.52 - time * 2.22) * 0.38;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.73, lr * 1.21 + time * -0.30); }
	q2 = rot2(2.04) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.58);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.77, 0.67, 0.50) * (0.07 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
