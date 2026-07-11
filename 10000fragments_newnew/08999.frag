uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.65 + sr * 19.31 - t * 1.30 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.97 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.42) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.08, length(p) * 2.63 - time * 0.36); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = d1 * d2;
	vec3 col = palette(d * 0.52 + time * 0.14, vec3(0.48, 0.54, 0.55), vec3(0.48, 0.38, 0.49), vec3(0.80, 1.14, 1.22), vec3(0.25, 0.13, 0.33));
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
