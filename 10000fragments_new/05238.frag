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
        float ang = ff * 2.3999632 + t * 0.53 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.21 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.94) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.62 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.21 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.26 * p.y + time * 0.73); p.y += 0.42 / wf * cos(wf * 3.34 * p.x + time * 2.09); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.00, lr * 2.52 + time * 0.63); }
	p.x += sin(p.y * 3.94 + time * 1.58) * 0.38;
	p = (floor(p * 14.6) + 0.5) / 14.6;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = d1 + d2;
	vec3 col = palette(d * 0.63 + time * 0.30, vec3(0.48, 0.42, 0.46), vec3(0.45, 0.46, 0.46), vec3(1.35, 1.06, 0.77), vec3(0.75, 0.79, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
