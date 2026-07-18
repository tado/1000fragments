uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	p.x += p.y * -0.49;
	p.y += sin(p.x * 1.09 + (time * 0.88) * 0.31) * 0.16;
	vec3 col = mix(vec3(0.025, 0.024, 0.061), vec3(0.026, 0.029, 0.043), clamp(0.5 + p.y * -0.01 + p.x * 0.14, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 0.71 + (time * 0.88) * 0.15;
		float yc = (fs / 6.0 - 0.5) * 0.98 + 0.18 * sin(p.x * 1.53 + sp) + 0.09 * sin(p.x * 3.00 - sp * 0.63);
		float wd = 0.09 + 0.06 * sin(p.x * 1.51 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.98);
		band *= 0.70 + 0.31 * sin(dd * 2.11 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.861, 6.339, 7.816) + fs * 0.66 + (time * 0.88) * 0.13);
		col += tone * band * 0.39;
	}
	col = col / (1.0 + col * 0.55);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.033, 1.000, 0.921);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
