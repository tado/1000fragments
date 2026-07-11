uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.50 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.14) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.72, t * 2.15 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.65 + time * 0.40) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.97 * p.y + time * 1.44); p.y += 0.23 / wf * cos(wf * 3.31 * p.x + time * 1.74); }
	p = (floor(p * 19.6) + 0.5) / 19.6;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.80, lr * 1.10 + time * -0.20); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.05, vec3(0.45, 0.59, 0.47), vec3(0.40, 0.49, 0.43), vec3(1.36, 0.91, 1.12), vec3(0.30, 0.81, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
