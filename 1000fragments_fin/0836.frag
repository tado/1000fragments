uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.50;
	p.y += sin(p.x * 1.39 + (time * 0.90) * 0.30) * 0.12;
	vec3 col = mix(vec3(0.040, 0.034, 0.075), vec3(0.034, 0.027, 0.044), clamp(0.5 + p.y * 0.36 + p.x * -0.21, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 1.14 + (time * 0.90) * -0.30;
		float yc = (fs / 5.0 - 0.5) * 1.35 + 0.20 * sin(p.x * 0.93 + sp) + 0.13 * sin(p.x * 3.70 - sp * 0.63);
		float wd = 0.10 + 0.04 * sin(p.x * 1.03 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.07);
		band *= 0.61 + 0.33 * sin(dd * 3.36 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.615, 2.312, 4.009) + fs * 0.30 + (time * 0.90) * 0.19);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.44);
	}
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 2.04 + (time * 0.90) * 12.26);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.029, 1.006, 0.932);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
