uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.75 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.86) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.83), cos(time * 1.44)) * 0.16;
	float an = atan(p.y, p.x) + time * -0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.56 / 3.1415927, 0.60 / r - time * 0.93);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.36, 0.77, 0.99) + vec3(0.14, 0.18, 0.03);
	col *= clamp(r * 1.35, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
