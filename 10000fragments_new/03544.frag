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
        float ang = ff * 2.3999632 + t * 0.29 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.84) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.85 / 3.1415927, 1.30 / r - time * 0.64);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.29, vec3(0.53, 0.53, 0.42), vec3(0.44, 0.48, 0.42), vec3(1.39, 1.22, 0.77), vec3(0.26, 0.43, 0.15));
	col *= clamp(r * 2.29, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.05 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
