uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.35;
	vec3 col = mix(vec3(0.013, 0.049, 0.079), vec3(0.020, 0.065, 0.089), clamp(0.5 + p.y * 0.19 + p.x * 0.11, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 0.71 + (time * 0.82) * 0.37;
		float yc = (fs / 8.0 - 0.5) * 1.09 + 0.10 * sin(p.x * 0.89 + sp) + 0.11 * sin(p.x * 2.47 - sp * 0.63);
		float wd = 0.08 + 0.06 * sin(p.x * 1.46 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.02);
		band *= 0.66 + 0.29 * sin(dd * 2.59 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.184, 6.198, 8.213) + fs * 0.64 + (time * 0.82) * 0.25);
		col += tone * band * 0.47;
	}
	col = col / (1.0 + col * 0.53);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.979, 1.010, 0.958);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
