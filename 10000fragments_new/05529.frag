uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.95 + t * 3.46 + ph) * 0.7;
    float wb = sin(p.y * 10.30 - t * 2.18 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.79;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.34 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.61) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.24 / wf * sin(wf * 2.05 * q1.y + time * 1.81); q1.y += 0.29 / wf * cos(wf * 2.64 * q1.x + time * 1.06); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.79 + time * 0.34, vec3(0.46, 0.46, 0.53), vec3(0.50, 0.50, 0.46), vec3(1.26, 0.75, 1.00), vec3(0.00, 0.59, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
