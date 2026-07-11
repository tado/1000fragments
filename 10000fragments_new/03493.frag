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
        float ang = ff * 2.3999632 + t * 0.43 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.31) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.96 - t * 7.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	p = rot2(length(p) * -2.68 + time * 0.77) * p;
	p.x += sin(p.y * 5.92 + time * 2.28) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.32);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.93 + time * 0.16, vec3(0.60, 0.49, 0.43), vec3(0.44, 0.34, 0.43), vec3(1.14, 1.23, 1.09), vec3(0.92, 0.57, 0.12));
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 1.09 + time * 14.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
