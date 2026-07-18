uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.24 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.15 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.92) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.06 + (time * 0.78) * 1.28) * 0.09;
	p += vec2(sin((time * 0.78) * 1.38), cos((time * 0.78) * 0.87)) * 0.17;
	float an = atan(p.y, p.x) + (time * 0.78) * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.50 / 3.1415927, 0.83 / r - (time * 0.78) * 1.13);
	float d = field(tv, (time * 0.78), 0.0);
	vec3 col = palette((d) * 1.02 + (time * 0.78) * 0.20, vec3(0.32, 0.25, 0.42), vec3(0.41, 0.36, 0.49), vec3(1.04, 0.95, 0.98), vec3(0.58, 0.80, 0.07));
	col *= clamp(r * 2.61, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.947, 0.978, 1.058);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
