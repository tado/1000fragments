uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.46;
	vec3 col = mix(vec3(0.059, 0.059, 0.031), vec3(0.111, 0.052, 0.056), clamp(0.5 + p.y * 0.47 + p.x * -0.26, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.72 + (time * 0.77) * -0.24;
		float yc = (fs / 8.0 - 0.5) * 1.45 + 0.17 * sin(p.x * 0.99 + sp) + 0.05 * sin(p.x * 3.26 - sp * 0.63);
		float wd = 0.06 + 0.02 * sin(p.x * 0.99 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.23);
		band *= 0.73 + 0.26 * sin(dd * 4.24 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.283, 6.918, 8.552) + fs * 0.79 + (time * 0.77) * 0.26);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.54);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.921, 0.979, 1.056);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
