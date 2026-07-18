uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.43;
	p.y = abs(p.y) - 0.57;
	p.y += sin(p.x * 1.47 + (time * 0.68) * 0.32) * 0.08;
	vec3 col = mix(vec3(0.051, 0.044, 0.072), vec3(0.037, 0.067, 0.110), clamp(0.5 + p.y * -0.31 + p.x * -0.05, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 1.80 + (time * 0.68) * -0.30;
		float yc = (fs / 5.0 - 0.5) * 0.81 + 0.11 * sin(p.x * 1.62 + sp) + 0.11 * sin(p.x * 3.99 - sp * 0.63);
		float wd = 0.06 + 0.03 * sin(p.x * 0.99 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.61);
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.925, 6.904, 7.884) + fs * 0.72 + (time * 0.68) * 0.35);
		col += tone * band * 0.30;
	}
	col = col / (1.0 + col * 0.56);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.985, 1.008, 0.946);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
