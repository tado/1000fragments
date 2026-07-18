uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.34;
	vec3 col = mix(vec3(0.032, 0.067, 0.061), vec3(0.033, 0.060, 0.090), clamp(0.5 + p.y * 0.23 + p.x * 0.11, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.70 + (time * 0.63) * -0.32;
		float yc = (fs / 8.0 - 0.5) * 1.35 + 0.08 * sin(p.x * 1.28 + sp) + 0.10 * sin(p.x * 3.13 - sp * 0.63);
		float wd = 0.09 + 0.03 * sin(p.x * 1.70 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.87);
		band *= 0.73 + 0.32 * sin(dd * 3.87 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.076, 6.101, 7.126) + fs * 0.73 + (time * 0.63) * 0.18);
		col += tone * band * 0.54;
	}
	col = col / (1.0 + col * 0.49);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.936, 0.980, 1.031);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
