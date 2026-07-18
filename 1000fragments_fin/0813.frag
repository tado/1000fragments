uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 0.83;
	p.y += sin(p.x * 0.96 + (time * 0.91) * 0.46) * 0.12;
	vec3 col = mix(vec3(0.059, 0.042, 0.048), vec3(0.111, 0.075, 0.060), clamp(0.5 + p.y * -0.39 + p.x * -0.13, 0.0, 1.0));
	for(int si = 0; si < 9; si++){
		float fs = float(si);
		float sp = fs * 1.96 + (time * 0.91) * -0.23;
		float yc = (fs / 9.0 - 0.5) * 1.46 + 0.09 * sin(p.x * 1.17 + sp) + 0.05 * sin(p.x * 1.99 - sp * 0.63);
		float wd = 0.09 + 0.03 * sin(p.x * 1.29 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 1.79);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.129, 5.232, 6.334) + fs * 0.75 + (time * 0.91) * 0.17);
		col += tone * band * 0.32;
	}
	col = col / (1.0 + col * 0.67);
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 2.39 + (time * 0.91) * 13.63);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.920, 0.996, 1.059);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
