uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.52 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.12 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.24, lr * 1.84 + time * -0.68); }
	p.y += sin(p.x * 3.95 + time * 3.12) * 0.28;
	p = (floor(p * 29.0) + 0.5) / 29.0;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 0.59, 1.55) + vec3(0.09, 0.19, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
