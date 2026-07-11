uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.77 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.19 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.90) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.63) * 1.09), cos((time * 0.63) * 1.06)) * 0.23;
	float an = atan(p.y, p.x) + (time * 0.63) * -0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.91 / 3.1415927, 0.72 / r + (time * 0.63) * 2.26);
	float d = field(tv, (time * 0.63), 0.0);
	vec3 col = palette((d) * 0.71 + (time * 0.63) * 0.13, vec3(0.19, 0.31, 0.19), vec3(0.29, 0.27, 0.29), vec3(0.48, 0.56, 0.57), vec3(0.85, 0.63, 0.36));
	col *= clamp(r * 1.81, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.993, 0.994) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
