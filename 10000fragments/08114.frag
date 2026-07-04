uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.70 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.89) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	p *= 2.78;
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 2.35 - time * 0.72); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.79, 0.68, 0.35) * (0.14 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
