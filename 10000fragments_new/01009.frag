uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.30 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.19 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.77 / 3.1415927, 0.31 / r + time * 1.00);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.21, 0.51), vec3(0.94, 0.58, 0.63), cc);
	col *= clamp(r * 2.38, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
