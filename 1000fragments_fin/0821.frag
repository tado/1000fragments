uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.45 + (time * 0.64) * 0.23) * 0.15;
	vec3 col = mix(vec3(0.038, 0.042, 0.080), vec3(0.049, 0.055, 0.102), clamp(0.5 + p.y * 0.15 + p.x * 0.02, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 0.93 + (time * 0.64) * -0.22;
		float yc = (fs / 5.0 - 0.5) * 1.60 + 0.13 * sin(p.x * 0.85 + sp) + 0.09 * sin(p.x * 2.07 - sp * 0.63);
		float wd = 0.11 + 0.02 * sin(p.x * 0.83 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.76);
		band *= 0.65 + 0.35 * sin(dd * 3.28 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.440, 4.463, 6.486) + fs * 0.36 + (time * 0.64) * 0.23);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.60);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.018, 0.982, 0.950);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
