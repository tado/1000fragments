uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.08 + ph), sin(lt * 1.0 + t * 0.44)) * 0.51;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.47) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.44;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.70), 0.0);
	vec2 hq = rot2(0.56) * p * 13.33;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.12, 0.01, 0.05), vec3(0.73, 0.85, 0.97), v);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.030, 0.988, 0.929);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
