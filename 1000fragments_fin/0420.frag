uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.85 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.61;
	p.y = abs(p.y) - 0.58;
	float d = 0.5 + 0.5 * field(p, (time * 0.85), 0.0);
	vec2 hq = rot2(0.27) * p * 9.27;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.80, 0.91, 0.92), vec3(0.14, 0.01, 0.13), v);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.032, 0.985, 0.932);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
