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
        float ang = ff * 2.3999632 + t * 0.44 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.25) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.63;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.69 / 3.1415927, 0.66 / r + time * 1.47);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.32, vec3(0.54, 0.44, 0.52), vec3(0.43, 0.38, 0.32), vec3(0.77, 1.04, 1.06), vec3(0.06, 0.15, 0.22));
	col *= clamp(r * 2.05, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
