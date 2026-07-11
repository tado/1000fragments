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
        float ang = ff * 2.3999632 + t * 0.88 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.80) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 1.99 + time * -0.82); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.00, vec3(0.47, 0.48, 0.50), vec3(0.45, 0.37, 0.44), vec3(0.91, 0.99, 0.95), vec3(0.04, 0.43, 0.87));
	col = fract(col * 2.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
