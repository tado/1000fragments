uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.38 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.98) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.64;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.63; kp = rot2(1.64) * kp; kp *= 1.19; }
    v = sin(kp.x * 2.90 - t * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.26 / wf * sin(wf * 2.89 * q1.y + time * 1.18); q1.y += 0.45 / wf * cos(wf * 2.47 * q1.x + time * 0.77); }
	q2.y += sin(q2.x * 3.02 + time * 2.77) * 0.39;
	q2 = rot2(length(q2) * 1.58 + time * 0.86) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.64);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.27, vec3(0.56, 0.40, 0.49), vec3(0.35, 0.45, 0.36), vec3(1.02, 1.07, 0.89), vec3(0.64, 0.59, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
