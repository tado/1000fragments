uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 col = mix(vec3(0.048, 0.042, 0.056), vec3(0.068, 0.046, 0.096), clamp(0.5 + p.y * -0.04 + p.x * -0.27, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.72 + (time * 0.91) * -0.31;
		float yc = (fs / 7.0 - 0.5) * 1.01 + 0.19 * sin(p.x * 1.72 + sp) + 0.07 * sin(p.x * 2.44 - sp * 0.63);
		float wd = 0.14 + 0.03 * sin(p.x * 1.38 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.86);
		band *= 0.61 + 0.26 * sin(dd * 2.34 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.245, 3.219, 4.192) + fs * 0.85 + (time * 0.91) * 0.48);
		col += tone * band * 0.33;
	}
	col = col / (1.0 + col * 0.35);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.20));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.010, 0.992, 1.003);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
