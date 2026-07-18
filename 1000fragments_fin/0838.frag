uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p.y += sin(p.x * 0.62 + (time * 0.83) * 0.27) * 0.14;
	vec3 col = mix(vec3(0.025, 0.071, 0.089), vec3(0.018, 0.043, 0.064), clamp(0.5 + p.y * 0.38 + p.x * -0.26, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.77 + (time * 0.83) * 0.21;
		float yc = (fs / 7.0 - 0.5) * 1.47 + 0.16 * sin(p.x * 1.67 + sp) + 0.08 * sin(p.x * 4.17 - sp * 0.63);
		float wd = 0.06 + 0.06 * sin(p.x * 1.16 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 1.89);
		band *= 0.63 + 0.26 * sin(dd * 2.13 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.426, 4.074, 5.721) + fs * 0.36 + (time * 0.83) * 0.13);
		col += tone * band * 0.28;
	}
	col = col / (1.0 + col * 0.39);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.011, 1.007, 0.997);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
