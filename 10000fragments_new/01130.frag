uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.55) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 2.53 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.14 - t * 2.59 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.51 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.49 + t * 2.13 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 7.93 + time * 2.33) * 0.21;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.42 / wf * sin(wf * 3.76 * q1.y + time * 2.11); q1.y += 0.39 / wf * cos(wf * 3.49 * q1.x + time * 1.26); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.98, length(q2) * 4.06 - time * 0.73); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.49);
	float d3 = fieldC(q3, time, 1.41);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.39, vec3(0.46, 0.41, 0.48), vec3(0.31, 0.41, 0.42), vec3(0.88, 1.39, 0.91), vec3(0.21, 0.45, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
