uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.93 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.32 + t * 3.31 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.96;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.34 + 0.09 * sin(t * 1.23 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.39;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 3.56 * q2.y + time * 1.49); q2.y += 0.25 / wf * cos(wf * 3.94 * q2.x + time * 1.26); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.40, lr * 2.09 + time * -0.43); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.15 + time * 0.05, vec3(0.60, 0.54, 0.50), vec3(0.37, 0.41, 0.40), vec3(1.34, 1.04, 0.87), vec3(0.18, 0.31, 0.66));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.72 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
