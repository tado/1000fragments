uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p.x = abs(p.x);
	p.y += sin(p.x * 0.78 + (time * 0.89) * 0.52) * 0.12;
	vec3 col = mix(vec3(0.009, 0.066, 0.076), vec3(0.029, 0.067, 0.103), clamp(0.5 + p.y * -0.21 + p.x * 0.14, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 1.22 + (time * 0.89) * 0.25;
		float yc = (fs / 5.0 - 0.5) * 1.33 + 0.12 * sin(p.x * 2.04 + sp) + 0.06 * sin(p.x * 2.61 - sp * 0.63);
		float wd = 0.12 + 0.04 * sin(p.x * 1.81 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 1.92);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.413, 4.343, 6.274) + fs * 0.86 + (time * 0.89) * 0.29);
		col += tone * band * 0.44;
	}
	col = col / (1.0 + col * 0.62);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.037, 1.003, 0.938);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
