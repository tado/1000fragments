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
        float ang = ff * 2.3999632 + t * 0.90 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.81) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.53), cos(time * 0.90)) * 0.17;
	float an = atan(p.y, p.x) + time * 0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 1.11 / r + time * 0.67);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.03, vec3(0.45, 0.43, 0.46), vec3(0.32, 0.45, 0.31), vec3(0.91, 0.76, 1.30), vec3(0.27, 0.24, 0.80));
	col *= clamp(r * 1.67, 0.0, 1.0);
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
