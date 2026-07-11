uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.71 + sr * 5.61 - t * 1.61 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.88 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.77) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.15 * p.y + time * 2.13); p.y += 0.33 / wf * cos(wf * 2.65 * p.x + time * 1.77); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.58 + time * 0.06, vec3(0.59, 0.51, 0.58), vec3(0.35, 0.36, 0.37), vec3(1.27, 1.25, 0.97), vec3(0.52, 0.35, 0.59));
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 2.19 + time * 4.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
