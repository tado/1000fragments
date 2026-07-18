uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x += p.y * -0.40;
	vec3 col = vec3(0.04, 0.03, 0.06);
	for(int si = 0; si < 9; si++){
		float fs = float(si);
		float sp = fs * 0.85 + (time * 0.56) * 0.45;
		float yc = (fs / 9.0 - 0.5) * 0.82 + 0.22 * sin(p.x * 1.84 + sp) + 0.10 * sin(p.x * 2.20 - sp * 0.63);
		float wd = 0.13 + 0.04 * sin(p.x * 0.90 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.94);
		band *= 0.63 + 0.35 * sin(dd * 2.92 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.735, 3.482, 4.229) + fs * 0.65 + (time * 0.56) * 0.18);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.46);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.994, 1.001, 1.004);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
