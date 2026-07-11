uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.23 + t * 3.68 + ph) * 0.7;
    float wb = sin(p.y * 8.05 - t * 3.01 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.57 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.66) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.33 / wf * sin(wf * 3.51 * q1.y + time * 0.96); q1.y += 0.33 / wf * cos(wf * 2.26 * q1.x + time * 1.62); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.81);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.29, vec3(0.49, 0.48, 0.44), vec3(0.49, 0.43, 0.39), vec3(1.07, 1.19, 0.90), vec3(0.50, 0.77, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
