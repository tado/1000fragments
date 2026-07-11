uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.91 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.25 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p.x += sin(p.y * 4.32 + time * 1.95) * 0.34;
	p = fract(p * 1.15) - 0.5;
	p = rot2(p.y * -1.06 + time * 1.08) * p;
	p += vec2(0.04, 0.94) * sin(length(p) * 2.58 - time * 2.03) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.97, 0.88, 0.60) * (0.21 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
