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
        float ang = ff * 2.3999632 + t * 0.65 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.70) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.91), cos(time * 0.86)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.56 / 3.1415927, 1.19 / r + time * 1.01);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.36, vec3(0.48, 0.47, 0.53), vec3(0.42, 0.42, 0.36), vec3(1.25, 1.37, 1.07), vec3(0.05, 0.31, 0.74));
	col *= clamp(r * 2.17, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
