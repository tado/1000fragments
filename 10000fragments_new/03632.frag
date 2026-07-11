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
        float ang = ff * 2.3999632 + t * 0.71 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 0.51 / r + time * 2.91);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.20, vec3(0.44, 0.50, 0.49), vec3(0.32, 0.40, 0.46), vec3(1.05, 0.93, 0.97), vec3(0.62, 0.68, 0.20));
	col *= clamp(r * 2.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
