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
        float ang = ff * 2.3999632 + t * 0.63 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.85) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.65 + t * 4.41 + ph) + sin(p.y * 11.85 - t * 3.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	p = rot2(length(p) * -3.29 + time * 1.47) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -2.32 + time * 0.56) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = d1 * d2;
	vec3 col = palette(d * 0.59 + time * 0.05, vec3(0.42, 0.58, 0.49), vec3(0.43, 0.41, 0.49), vec3(0.77, 1.11, 0.97), vec3(0.49, 0.47, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
