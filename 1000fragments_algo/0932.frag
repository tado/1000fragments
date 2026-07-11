uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.92 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.54 + (time * 0.69) * 1.24) * 0.17;
	p.x += p.y * 0.55;
	p += vec2(sin((time * 0.69) * 0.75), cos((time * 0.69) * 1.47)) * 0.26;
	float an = atan(p.y, p.x) + (time * 0.69) * -0.65;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.10 / 3.1415927, 0.89 / r - (time * 0.69) * 2.34);
	float d = field(tv, (time * 0.69), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.54, 0.71, 0.66) + vec3(0.07, 0.01, 0.02);
	col *= clamp(r * 1.33, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.54 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 0.994, 0.936) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
