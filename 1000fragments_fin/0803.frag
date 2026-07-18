uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y += sin(p.x * 1.63 + (time * 0.79) * 0.57) * 0.19;
	p.y += sin(p.x * 0.70 + (time * 0.79) * 0.41) * 0.08;
	vec3 col = mix(vec3(0.024, 0.032, 0.071), vec3(0.024, 0.026, 0.069), clamp(0.5 + p.y * 0.24 + p.x * 0.20, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 0.75 + (time * 0.79) * -0.49;
		float yc = (fs / 5.0 - 0.5) * 1.12 + 0.17 * sin(p.x * 1.89 + sp) + 0.12 * sin(p.x * 3.92 - sp * 0.63);
		float wd = 0.09 + 0.04 * sin(p.x * 0.82 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.74);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.791, 2.275, 3.759) + fs * 0.78 + (time * 0.79) * 0.45);
		col += tone * band * 0.34;
	}
	col = col / (1.0 + col * 0.63);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.015, 0.998, 0.953);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
