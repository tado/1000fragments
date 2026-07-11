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
        float ang = ff * 2.3999632 + t * 0.56 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.25 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.53) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	p = fract(p * 1.11) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.80, lr * 1.41 + time * -0.48); }
	p = (floor(p * 8.5) + 0.5) / 8.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.27, vec3(0.60, 0.42, 0.55), vec3(0.49, 0.36, 0.44), vec3(0.78, 0.79, 1.11), vec3(0.90, 0.23, 0.94));
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
