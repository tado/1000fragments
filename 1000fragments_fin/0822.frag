uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.75;
	p.y += sin(p.x * 2.28 + (time * 0.84) * 0.56) * 0.06;
	p.y += sin(p.x * 0.95 + (time * 0.84) * 0.55) * 0.15;
	vec3 col = mix(vec3(0.040, 0.031, 0.081), vec3(0.020, 0.026, 0.112), clamp(0.5 + p.y * -0.59 + p.x * 0.22, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 1.91 + (time * 0.84) * 0.39;
		float yc = (fs / 6.0 - 0.5) * 1.18 + 0.18 * sin(p.x * 1.07 + sp) + 0.07 * sin(p.x * 3.60 - sp * 0.63);
		float wd = 0.13 + 0.03 * sin(p.x * 1.54 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.29);
		band *= 0.66 + 0.28 * sin(dd * 4.91 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.571, 4.040, 5.508) + fs * 0.40 + (time * 0.84) * 0.10);
		col += tone * band * 0.45;
	}
	col = col / (1.0 + col * 0.47);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.043, 0.992, 0.943);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
