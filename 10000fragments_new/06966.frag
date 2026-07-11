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
        float ang = ff * 2.3999632 + t * 0.49 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.19 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.82) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.33;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.31) * kp; kp *= 1.15; }
    v = sin(kp.y * 1.89 - t * 1.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.00, length(p) * 5.26 - time * 0.60); }
	p = rot2(p.y * -3.86 + time * 0.90) * p;
	p *= 1.76;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.78);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.68 + time * 0.08, vec3(0.48, 0.43, 0.49), vec3(0.32, 0.46, 0.50), vec3(0.99, 0.97, 0.75), vec3(0.34, 0.35, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
