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
        float ang = ff * 2.3999632 + t * 0.29 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.30) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.11 * cos(sa * 4.0 + t * 1.33 + ph);
    v = sin((sr - petal) * 7.67);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.49, length(p) * 2.14 - time * 0.48); }
	p = fract(p * 1.29) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.13, vec3(0.54, 0.42, 0.50), vec3(0.46, 0.48, 0.39), vec3(0.95, 0.91, 1.39), vec3(0.82, 0.65, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
