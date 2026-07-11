uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.93 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.83) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 2.54 - time * 0.91); }
	p.x += sin(p.y * 7.89 + time * 2.55) * 0.35;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.37));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.04, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
