uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.29 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.02) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.99 + t * 4.59 + ph) + sin(p.y * 5.91 - t * 3.01 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.14;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.55; kp = rot2(2.62) * kp; kp *= 1.36; }
    v = sin(kp.x * 1.97 - t * 4.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.46 / wf * sin(wf * 2.37 * q1.y + time * 1.31); q1.y += 0.37 / wf * cos(wf * 2.07 * q1.x + time * 0.95); }
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = sin(q2 * 1.85 + time * 1.58) * 1.24;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.65));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d3 = fieldC(q3, time, 0.31);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.37 + time * 0.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
