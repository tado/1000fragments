uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.06, 0.04, 0.04);
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 0.73 + (time * 0.78) * -0.33;
		float yc = (fs / 6.0 - 0.5) * 1.35 + 0.20 * sin(p.x * 0.95 + sp) + 0.09 * sin(p.x * 2.74 - sp * 0.63);
		float wd = 0.06 + 0.03 * sin(p.x * 1.12 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.21);
		band *= 0.62 + 0.35 * sin(dd * 2.83 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.851, 5.609, 6.368) + fs * 0.35 + (time * 0.78) * 0.46);
		col += tone * band * 0.49;
	}
	col = col / (1.0 + col * 0.69);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.013, 0.979, 0.962);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
