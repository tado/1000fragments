uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = mix(vec3(0.036, 0.070, 0.057), vec3(0.046, 0.093, 0.081), clamp(0.5 + p.y * 0.63 + p.x * 0.04, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.44 + (time * 0.82) * 0.46;
		float yc = (fs / 8.0 - 0.5) * 1.30 + 0.10 * sin(p.x * 0.88 + sp) + 0.11 * sin(p.x * 2.63 - sp * 0.63);
		float wd = 0.07 + 0.05 * sin(p.x * 0.88 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.64);
		band *= 0.63 + 0.27 * sin(dd * 2.90 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(6.250, 8.052, 9.854) + fs * 0.82 + (time * 0.82) * 0.32);
		col += tone * band * 0.28;
	}
	col = col / (1.0 + col * 0.43);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.030, 1.010, 0.928);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
