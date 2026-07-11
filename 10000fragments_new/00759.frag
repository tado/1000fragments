uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.88 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.68) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.41;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.07 - t * 1.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.79, -0.87) * sin(length(q1) * 5.19 - time * 1.56) * 0.28;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.33 / wf * sin(wf * 2.68 * q2.y + time * 0.81); q2.y += 0.43 / wf * cos(wf * 3.65 * q2.x + time * 1.66); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.16, lr * 1.57 + time * -0.52); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.31));
	vec3 col = vec3(0.85, 0.43, 0.16) * (0.05 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 2.77 + time * 13.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
