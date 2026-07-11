uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.53;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.75; kp = rot2(2.67) * kp; kp *= 1.28; }
    v = sin(kp.x * 3.55 - t * 2.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.41 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.25 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	p = rot2(p.y * 2.85 + time * 0.80) * p;
	p *= 2.58;
	p = fract(p * 1.83) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 2.00);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.50 + time * 0.13, vec3(0.43, 0.53, 0.54), vec3(0.38, 0.38, 0.49), vec3(1.34, 1.39, 0.80), vec3(0.87, 0.71, 0.89));
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
