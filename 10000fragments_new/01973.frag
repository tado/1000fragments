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
        float ang = ff * 2.3999632 + t * 0.53 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.51) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 1.22)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.93 / 3.1415927, 0.93 / r - time * 2.43);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.36, vec3(0.54, 0.51, 0.57), vec3(0.49, 0.41, 0.46), vec3(0.83, 1.29, 1.26), vec3(0.38, 0.29, 0.15));
	col *= clamp(r * 2.39, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
