uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.45 * sin(t * 1.11) + t * 2.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.37 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.04) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 2.86 + time * -0.75); }
	p = rot2(p.y * -1.49 + time * 0.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.79 + time * 0.03, vec3(0.55, 0.56, 0.49), vec3(0.50, 0.42, 0.35), vec3(0.85, 1.07, 1.01), vec3(0.89, 0.04, 0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
