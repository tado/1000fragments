uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.43 + (time * 0.71) * 0.22) * 0.10;
	vec3 col = vec3(0.08, 0.07, 0.08);
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.07 + (time * 0.71) * 0.36;
		float yc = (fs / 7.0 - 0.5) * 1.56 + 0.13 * sin(p.x * 0.86 + sp) + 0.14 * sin(p.x * 2.24 - sp * 0.63);
		float wd = 0.08 + 0.03 * sin(p.x * 1.35 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.96);
		band *= 0.65 + 0.37 * sin(dd * 2.41 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.460, 2.511, 4.561) + fs * 0.43 + (time * 0.71) * 0.46);
		col += tone * band * 0.52;
	}
	col = col / (1.0 + col * 0.44);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.002, 0.951, 1.012);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
