uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.06 + (time * 0.56) * 1.31) * 0.18;
	vec3 col = mix(vec3(0.051, 0.029, 0.079), vec3(0.062, 0.040, 0.055), clamp(0.5 + p.y * -0.36 + p.x * 0.08, 0.0, 1.0));
	for(int si = 0; si < 9; si++){
		float fs = float(si);
		float sp = fs * 1.60 + (time * 0.56) * -0.31;
		float yc = (fs / 9.0 - 0.5) * 1.32 + 0.13 * sin(p.x * 1.88 + sp) + 0.06 * sin(p.x * 3.87 - sp * 0.63);
		float wd = 0.12 + 0.04 * sin(p.x * 1.73 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.71);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.438, 5.957, 7.477) + fs * 0.29 + (time * 0.56) * 0.22);
		col += tone * band * 0.43;
	}
	col = col / (1.0 + col * 0.39);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.020, 0.987, 0.942);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
