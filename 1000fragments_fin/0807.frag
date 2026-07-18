uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y += sin(p.x * 1.60 + (time * 0.66) * 0.56) * 0.08;
	vec3 col = mix(vec3(0.076, 0.038, 0.048), vec3(0.043, 0.079, 0.050), clamp(0.5 + p.y * -0.58 + p.x * 0.30, 0.0, 1.0));
	for(int si = 0; si < 9; si++){
		float fs = float(si);
		float sp = fs * 1.45 + (time * 0.66) * 0.26;
		float yc = (fs / 9.0 - 0.5) * 0.91 + 0.11 * sin(p.x * 1.01 + sp) + 0.07 * sin(p.x * 1.95 - sp * 0.63);
		float wd = 0.10 + 0.05 * sin(p.x * 1.77 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 1.68);
		band *= 0.65 + 0.32 * sin(dd * 2.67 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.272, 7.257, 9.242) + fs * 0.41 + (time * 0.66) * 0.11);
		col += tone * band * 0.41;
	}
	col = col / (1.0 + col * 0.40);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.009, 0.989, 0.947);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
