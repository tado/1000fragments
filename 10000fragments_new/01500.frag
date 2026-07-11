uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.29 + t * 2.87 + ph) + sin(p.y * 10.49 - t * 2.87 + ph)
        + sin((p.x + p.y) * 10.27 + t * 2.87 + ph) + sin(length(p) * 17.93 - t * 2.87 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.70 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.46) * p;
	p = (floor(p * 26.7) + 0.5) / 26.7;
	{ p = vec2(atan(p.y, p.x) * 2.36, length(p) * 3.94 - time * 0.66); }
	p = rot2(length(p) * -3.41 + time * 0.93) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.66 + time * 0.23, vec3(0.46, 0.46, 0.45), vec3(0.37, 0.36, 0.30), vec3(1.01, 1.37, 1.21), vec3(0.54, 0.00, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
