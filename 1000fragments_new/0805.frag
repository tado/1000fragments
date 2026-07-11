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
        float ang = ff * 2.3999632 + t * 0.97 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.00) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	p = abs(p);
	p = sin(p * 2.63 + time * 2.08) * 1.08;
	p = rot2(p.y * 3.48 + time * 0.86) * p;
	p = (floor(p * 6.9) + 0.5) / 6.9;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.14, vec3(0.46, 0.43, 0.56), vec3(0.30, 0.36, 0.36), vec3(1.23, 1.37, 1.05), vec3(0.18, 0.48, 0.55));
	col = mod(col * 2.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
