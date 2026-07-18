uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.62) * 0.75), cos((time * 0.62) * 0.42)) * 0.07;
	p.y += sin(p.x * 2.34 + (time * 0.62) * 0.82) * 0.06;
	p *= 2.69;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 10.06 - (time * 0.62) * 4.45);
		col += fw * (0.5 + 0.5 * cos(vec3(2.411, 4.310, 6.208) + pv * 3.66 + float(zi) * 0.91 + (time * 0.62) * 0.49));
		q = rot2(0.64) * q * 1.74 + vec2(0.08, 0.07);
		fw *= 0.72;
	}
	col *= 0.35;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.016, 0.974, 0.951);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
