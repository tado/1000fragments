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
        float ang = ff * 2.3999632 + t * 0.98 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.20) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.18 * cos(sa * 8.0 + t * 2.80 + ph);
    v = sin((sr - petal) * 9.77);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p += vec2(-0.11, 0.62) * sin(length(p) * 4.22 - time * 1.83) * 0.36;
	p = rot2(length(p) * 3.07 + time * 0.33) * p;
	p = (floor(p * 11.0) + 0.5) / 11.0;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = d1 * d2;
	vec3 col = palette(d * 0.70 + time * 0.26, vec3(0.53, 0.44, 0.60), vec3(0.40, 0.43, 0.46), vec3(1.11, 0.80, 1.32), vec3(0.57, 0.30, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
