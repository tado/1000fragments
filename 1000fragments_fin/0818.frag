uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.21 + (time * 0.80) * 0.45) * 0.06;
	vec3 col = mix(vec3(0.065, 0.035, 0.078), vec3(0.029, 0.061, 0.122), clamp(0.5 + p.y * 0.43 + p.x * -0.28, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.09 + (time * 0.80) * -0.35;
		float yc = (fs / 7.0 - 0.5) * 1.42 + 0.19 * sin(p.x * 2.17 + sp) + 0.12 * sin(p.x * 4.01 - sp * 0.63);
		float wd = 0.08 + 0.06 * sin(p.x * 1.56 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.74);
		band *= 0.70 + 0.30 * sin(dd * 4.64 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.010, 2.008, 4.005) + fs * 0.32 + (time * 0.80) * 0.28);
		col += tone * band * 0.45;
	}
	col = col / (1.0 + col * 0.50);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.982, 1.020, 0.956);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
