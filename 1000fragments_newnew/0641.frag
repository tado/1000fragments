uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.89 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.56) * 0.54), cos((time * 0.56) * 1.07)) * 0.06;
	float an = atan(p.y, p.x) + (time * 0.56) * -0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.08 / 3.1415927, 1.29 / r - (time * 0.56) * 1.59);
	float d = field(tv, (time * 0.56), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.39, 0.50, 0.46) + vec3(0.10, 0.05, 0.09);
	col *= clamp(r * 1.05, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.980, 1.013) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
