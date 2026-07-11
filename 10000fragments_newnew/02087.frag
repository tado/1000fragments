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
        float ang = ff * 2.3999632 + t * 0.24 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.25 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.03) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.95)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.28 / 3.1415927, 1.49 / r + time * 1.81);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.08, vec3(0.43, 0.43, 0.50), vec3(0.38, 0.47, 0.42), vec3(0.83, 1.32, 1.05), vec3(0.03, 0.60, 0.53));
	col *= clamp(r * 2.50, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
