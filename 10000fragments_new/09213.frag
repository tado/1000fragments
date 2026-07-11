uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.52 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.69) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	{ p = vec2(atan(p.y, p.x) * 2.59, length(p) * 4.03 - time * 0.33); }
	p.x += sin(p.y * 5.39 + time * 1.71) * 0.16;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.48, 0.86, 1.24) + vec3(0.10, 0.07, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
