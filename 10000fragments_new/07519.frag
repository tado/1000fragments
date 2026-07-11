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
        float ang = ff * 2.3999632 + t * 0.78 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.30 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.72) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.19 * cos(sa * 6.0 + t * 1.09 + ph);
    v = sin((sr - petal) * 11.86);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	p = rot2(length(p) * -2.07 + time * 0.95) * p;
	p += vec2(-0.98, -0.18) * sin(length(p) * 2.13 - time * 2.24) * 0.34;
	p = rot2(time * 0.65) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = d1 * d2;
	vec3 col = palette(d * 0.81 + time * 0.25, vec3(0.56, 0.54, 0.44), vec3(0.47, 0.36, 0.48), vec3(0.95, 1.34, 0.75), vec3(0.65, 0.98, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
