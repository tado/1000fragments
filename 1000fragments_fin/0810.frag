uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.44;
	p.y = abs(p.y);
	vec3 col = mix(vec3(0.024, 0.054, 0.059), vec3(0.047, 0.097, 0.070), clamp(0.5 + p.y * -0.43 + p.x * 0.05, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.76 + (time * 0.71) * -0.40;
		float yc = (fs / 8.0 - 0.5) * 0.82 + 0.08 * sin(p.x * 2.09 + sp) + 0.09 * sin(p.x * 3.46 - sp * 0.63);
		float wd = 0.06 + 0.04 * sin(p.x * 1.94 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.76);
		band *= 0.64 + 0.30 * sin(dd * 3.48 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.118, 5.065, 6.012) + fs * 0.48 + (time * 0.71) * 0.26);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.59);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.003, 1.003, 1.012);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
