uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.31 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.79) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 21.1) + 0.5) / 21.1;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.37; }
	p = rot2(p.y * -1.48 + time * 1.01) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.76, 0.53, 0.77) * (0.23 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.86 + 0.20 * sin(gl_FragCoord.y * 2.07 + time * 7.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
