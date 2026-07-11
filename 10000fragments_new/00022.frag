uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.93 + sin(p.y * 4.40 + t * 4.66) * 4.81 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.39 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.30 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.66) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.84) - 0.5;
	p = rot2(length(p) * -2.10 + time * 1.04) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.51);
	float d = d1 * d2;
	vec3 col = palette(d * 0.53 + time * 0.19, vec3(0.50, 0.40, 0.53), vec3(0.40, 0.33, 0.32), vec3(1.02, 1.29, 1.37), vec3(0.35, 0.63, 0.78));
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
