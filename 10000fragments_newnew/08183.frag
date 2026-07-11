uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.30 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.57) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.68 / 3.1415927, 1.34 / r + time * 2.00);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.38);
	col *= clamp(r * 2.29, 0.0, 1.0);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.66 + time * 12.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
