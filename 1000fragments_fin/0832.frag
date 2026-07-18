uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec3 col = vec3(0.04, 0.04, 0.04);
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 0.72 + (time * 0.90) * 0.23;
		float yc = (fs / 5.0 - 0.5) * 1.30 + 0.19 * sin(p.x * 0.81 + sp) + 0.08 * sin(p.x * 3.76 - sp * 0.63);
		float wd = 0.07 + 0.05 * sin(p.x * 1.21 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.71);
		band *= 0.63 + 0.35 * sin(dd * 4.48 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.568, 4.458, 5.348) + fs * 0.81 + (time * 0.90) * 0.32);
		col += tone * band * 0.54;
	}
	col = col / (1.0 + col * 0.52);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.011, 1.002, 1.009);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
