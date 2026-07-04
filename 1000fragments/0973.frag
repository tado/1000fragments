uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.33 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.77) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	p = rot2(0.68) * p;
	p *= 2.30;
	p = rot2(length(p) * -2.47 + time * 0.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.43, 0.66, 0.90) * (0.21 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
