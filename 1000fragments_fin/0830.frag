uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.67;
	p.y += sin(p.x * 0.87 + (time * 0.65) * 0.22) * 0.13;
	vec3 col = mix(vec3(0.081, 0.050, 0.037), vec3(0.076, 0.056, 0.053), clamp(0.5 + p.y * 0.10 + p.x * 0.26, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.81 + (time * 0.65) * -0.15;
		float yc = (fs / 7.0 - 0.5) * 0.83 + 0.08 * sin(p.x * 0.81 + sp) + 0.15 * sin(p.x * 2.22 - sp * 0.63);
		float wd = 0.09 + 0.03 * sin(p.x * 1.20 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.71);
		band *= 0.71 + 0.29 * sin(dd * 4.45 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.993, 2.503, 4.013) + fs * 0.73 + (time * 0.65) * 0.31);
		col += tone * band * 0.34;
	}
	col = col / (1.0 + col * 0.46);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.988, 1.001, 0.989);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
