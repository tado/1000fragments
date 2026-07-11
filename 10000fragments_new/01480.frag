uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.95 + t * 3.28 + ph) * 0.7;
    float wb = sin(p.y * 6.35 - t * 2.23 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.47;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.55 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.82) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.31;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.73; kp = rot2(1.57) * kp; kp *= 1.32; }
    v = sin(kp.x * 1.22 - t * 4.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d3 = fieldC(q3, time, 1.04);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.23 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
