uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.38;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 9.71 - t * 4.12 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.97) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 3.15 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.12, lr * 1.49 + time * -0.44); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 2.25 * q2.y + time * 2.09); q2.y += 0.50 / wf * cos(wf * 3.53 * q2.x + time * 2.12); }
	q2 = rot2(time * 0.37) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.75, 0.30, 0.46) * (0.13 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.63 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
