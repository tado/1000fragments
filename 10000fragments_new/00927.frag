uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.31 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.77) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.22 / 3.1415927, 1.45 / r + time * 0.52);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.29, 0.02), vec3(0.70, 0.70, 0.68), cc);
	col *= clamp(r * 1.20, 0.0, 1.0);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 0.86 + time * 9.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
