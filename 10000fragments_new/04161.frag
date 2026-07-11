uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.60 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.31 + t * 3.92 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.39 + ph), sin(lt * 4.0 + t * 1.45)) * 0.91;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.17) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.23 * cos(sa * 5.0 + t * 1.28 + ph);
    v = sin((sr - petal) * 8.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.30 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q3.x += 0.25 / wf * sin(wf * 2.24 * q3.y + time * 1.41); q3.y += 0.36 / wf * cos(wf * 2.91 * q3.x + time * 1.32); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.25);
	float d3 = fieldC(q3, time, 0.28);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.01, 0.37), vec3(0.66, 0.84, 0.98), cc);
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
