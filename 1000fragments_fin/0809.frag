uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.27 + (time * 0.59) * 0.89) * 0.17;
	vec3 col = mix(vec3(0.053, 0.050, 0.067), vec3(0.087, 0.040, 0.057), clamp(0.5 + p.y * 0.16 + p.x * 0.11, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.61 + (time * 0.59) * 0.17;
		float yc = (fs / 8.0 - 0.5) * 1.36 + 0.18 * sin(p.x * 1.79 + sp) + 0.14 * sin(p.x * 2.47 - sp * 0.63);
		float wd = 0.11 + 0.04 * sin(p.x * 1.58 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.42);
		band *= 0.68 + 0.38 * sin(dd * 3.88 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.779, 2.524, 3.269) + fs * 0.67 + (time * 0.59) * 0.46);
		col += tone * band * 0.39;
	}
	col = col / (1.0 + col * 0.46);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.012, 0.965, 1.006);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
