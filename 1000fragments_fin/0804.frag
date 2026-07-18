uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.30;
	vec3 col = mix(vec3(0.052, 0.043, 0.071), vec3(0.050, 0.073, 0.057), clamp(0.5 + p.y * -0.18 + p.x * -0.17, 0.0, 1.0));
	for(int si = 0; si < 9; si++){
		float fs = float(si);
		float sp = fs * 1.44 + (time * 0.79) * 0.21;
		float yc = (fs / 9.0 - 0.5) * 1.40 + 0.20 * sin(p.x * 1.30 + sp) + 0.07 * sin(p.x * 2.44 - sp * 0.63);
		float wd = 0.10 + 0.04 * sin(p.x * 1.53 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.05);
		band *= 0.64 + 0.36 * sin(dd * 3.51 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.715, 6.682, 8.650) + fs * 0.53 + (time * 0.79) * 0.37);
		col += tone * band * 0.40;
	}
	col = col / (1.0 + col * 0.33);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.986, 1.012, 1.002);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
