uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y += sin(p.x * 1.55 + (time * 0.63) * 0.50) * 0.13;
	vec3 col = mix(vec3(0.038, 0.060, 0.072), vec3(0.039, 0.063, 0.080), clamp(0.5 + p.y * 0.60 + p.x * -0.07, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 1.97 + (time * 0.63) * -0.26;
		float yc = (fs / 5.0 - 0.5) * 1.29 + 0.16 * sin(p.x * 1.31 + sp) + 0.11 * sin(p.x * 3.22 - sp * 0.63);
		float wd = 0.09 + 0.04 * sin(p.x * 0.85 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.74);
		band *= 0.73 + 0.30 * sin(dd * 4.26 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.940, 2.132, 3.324) + fs * 0.45 + (time * 0.63) * 0.34);
		col += tone * band * 0.51;
	}
	col = col / (1.0 + col * 0.59);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.017, 0.945, 1.015);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
