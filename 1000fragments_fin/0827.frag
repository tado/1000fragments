uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.28;
	p *= 1.14;
	p.y += sin(p.x * 1.05 + (time * 0.62) * 0.50) * 0.08;
	vec3 col = mix(vec3(0.037, 0.060, 0.044), vec3(0.053, 0.085, 0.041), clamp(0.5 + p.y * -0.03 + p.x * -0.15, 0.0, 1.0));
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.60 + (time * 0.62) * -0.42;
		float yc = (fs / 8.0 - 0.5) * 1.52 + 0.21 * sin(p.x * 1.79 + sp) + 0.05 * sin(p.x * 3.86 - sp * 0.63);
		float wd = 0.10 + 0.05 * sin(p.x * 0.66 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.06);
		band *= 0.70 + 0.27 * sin(dd * 4.18 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.821, 4.700, 5.580) + fs * 0.43 + (time * 0.62) * 0.20);
		col += tone * band * 0.29;
	}
	col = col / (1.0 + col * 0.51);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.007, 0.991, 1.008);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
