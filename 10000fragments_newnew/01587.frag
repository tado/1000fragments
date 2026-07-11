uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.80 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.60) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 0.41)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.45;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.02 / 3.1415927, 0.93 / r - time * 0.61);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.24, vec3(0.55, 0.60, 0.44), vec3(0.40, 0.47, 0.36), vec3(1.25, 1.06, 1.15), vec3(0.04, 0.04, 0.67));
	col *= clamp(r * 1.78, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
