uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.92) * 0.93), cos((time * 0.92) * 1.12)) * 0.11;
	p = p.yx;
	p *= 1.64;
	vec3 col = mix(vec3(0.068, 0.041, 0.080), vec3(0.062, 0.041, 0.113), clamp(0.5 + p.y * -0.53 + p.x * 0.13, 0.0, 1.0));
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.92) * 1.10 * (0.3 + fi * 0.08) + fi * 2.4), cos((time * 0.92) * 0.66 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.71;
		vec2 bq = abs(p - q) - vec2(0.10, 0.08);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(4.721, 6.251, 7.781) + fi * 1.98 + (time * 0.92) * 1.20)) * (0.033 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.945, 0.970, 1.053);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
