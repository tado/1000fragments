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
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.68 + ph), sin(lt * 4.0 + t * 1.19)) * 0.55;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.36) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.23 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.08) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	p = rot2(length(p) * -1.98 + time * 1.38) * p;
	p = rot2(p.y * 2.98 + time * 1.10) * p;
	{ p = vec2(atan(p.y, p.x) * 1.44, length(p) * 3.99 - time * 0.23); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.57, lr * 1.21 + time * -0.98); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = d1 * d2;
	vec3 col = palette(d * 0.58 + time * 0.30, vec3(0.44, 0.55, 0.51), vec3(0.46, 0.36, 0.32), vec3(1.00, 1.13, 0.76), vec3(0.14, 0.52, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
