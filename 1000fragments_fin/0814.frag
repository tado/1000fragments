uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec3 col = mix(vec3(0.032, 0.034, 0.070), vec3(0.018, 0.034, 0.084), clamp(0.5 + p.y * -0.14 + p.x * -0.18, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.51 + (time * 0.57) * 0.39;
		float yc = (fs / 7.0 - 0.5) * 0.87 + 0.21 * sin(p.x * 1.83 + sp) + 0.07 * sin(p.x * 2.39 - sp * 0.63);
		float wd = 0.10 + 0.04 * sin(p.x * 1.40 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 1.95);
		band *= 0.69 + 0.27 * sin(dd * 3.85 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.253, 1.420, 2.587) + fs * 0.34 + (time * 0.57) * 0.43);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.42);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.945, 0.989, 1.033);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
