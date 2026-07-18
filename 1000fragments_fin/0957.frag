uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.24 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.68) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.89) * 1.28), cos((time * 0.89) * 0.80)) * 0.20;
	float an = atan(p.y, p.x) + (time * 0.89) * 0.39;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.76 / 3.1415927, 0.83 / r - (time * 0.89) * 2.15);
	float d = field(tv, (time * 0.89), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.056, 0.066, 0.054), vec3(0.699, 0.307, 0.169), smoothstep(0.0, 0.58, cc)), vec3(0.998, 0.820, 0.655), smoothstep(0.58, 1.0, cc));
	col *= clamp(r * 2.09, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.56 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.053, 1.002, 0.942);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
