uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 0.96 + (time * 0.62) * 0.34) * 0.15;
	vec3 col = mix(vec3(0.059, 0.037, 0.081), vec3(0.093, 0.050, 0.097), clamp(0.5 + p.y * -0.06 + p.x * -0.03, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 1.77 + (time * 0.62) * -0.50;
		float yc = (fs / 6.0 - 0.5) * 0.90 + 0.18 * sin(p.x * 1.97 + sp) + 0.13 * sin(p.x * 3.36 - sp * 0.63);
		float wd = 0.10 + 0.04 * sin(p.x * 0.98 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.53);
		band *= 0.63 + 0.34 * sin(dd * 4.46 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.931, 5.847, 6.764) + fs * 0.30 + (time * 0.62) * 0.29);
		col += tone * band * 0.46;
	}
	col = col / (1.0 + col * 0.66);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.977, 1.020, 0.933);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
