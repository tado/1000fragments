uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.53 + t * 2.88 + ph) + sin(p.y * 13.70 - t * 5.17 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.87 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p = rot2(length(p) * 2.24 + time * 0.60) * p;
	p = abs(p) - 0.22;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.44));
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.02 * p.y + time * 2.15); p.y += 0.32 / wf * cos(wf * 1.92 * p.x + time * 1.09); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = d1 * d2;
	vec3 col = palette(d * 0.66 + time * 0.15, vec3(0.47, 0.57, 0.58), vec3(0.31, 0.44, 0.34), vec3(0.85, 1.11, 0.94), vec3(0.69, 0.74, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
