uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.22;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.80; kp = rot2(1.19) * kp; kp *= 1.41; }
    v = sin(kp.x * 2.08 - t * 1.13 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.56 + ph), sin(lt * 4.0 + t * 0.93)) * 0.85;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.94) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.21 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.30 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.03) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.22 * fr * fr; }
	q1 = rot2(time * 1.19) * q1;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.32 / wf * sin(wf * 2.95 * q2.y + time * 1.08); q2.y += 0.29 / wf * cos(wf * 3.31 * q2.x + time * 1.59); }
	q3 = (floor(q3 * 19.0) + 0.5) / 19.0;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.38);
	float d3 = fieldC(q3, time, 1.85);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.11));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.53, 1.20, 0.69) + vec3(0.01, 0.09, 0.16);
	col = mod(col * 1.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
