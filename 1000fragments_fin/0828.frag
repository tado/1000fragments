uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y += sin(p.x * 0.92 + (time * 0.57) * 0.55) * 0.08;
	vec3 col = mix(vec3(0.061, 0.051, 0.036), vec3(0.078, 0.051, 0.069), clamp(0.5 + p.y * -0.04 + p.x * 0.18, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.48 + (time * 0.57) * -0.48;
		float yc = (fs / 7.0 - 0.5) * 1.04 + 0.10 * sin(p.x * 1.99 + sp) + 0.08 * sin(p.x * 3.69 - sp * 0.63);
		float wd = 0.11 + 0.06 * sin(p.x * 1.48 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.44);
		band *= 0.68 + 0.35 * sin(dd * 3.23 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.955, 4.653, 6.350) + fs * 0.36 + (time * 0.57) * 0.47);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.43);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.990, 1.002, 0.931);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
