uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.42 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.95) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.48, lr * 2.33 + time * 0.65); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 1.79 * p.y + time * 1.61); p.y += 0.43 / wf * cos(wf * 2.18 * p.x + time * 0.75); }
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.24, vec3(0.47, 0.47, 0.49), vec3(0.48, 0.37, 0.43), vec3(0.82, 1.32, 0.78), vec3(0.62, 0.90, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
