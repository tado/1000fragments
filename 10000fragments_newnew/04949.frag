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
        float ang = ff * 2.3999632 + t * 0.57 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.96) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.38), cos(time * 0.48)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.10 / 3.1415927, 1.47 / r - time * 2.26);
	tv.x += tv.y * 0.31;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.29, vec3(0.42, 0.52, 0.57), vec3(0.36, 0.36, 0.43), vec3(1.00, 1.38, 0.79), vec3(0.81, 0.30, 0.53));
	col *= clamp(r * 1.73, 0.0, 1.0);
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
