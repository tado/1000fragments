uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.04, 0.05, 0.06);
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 1.05 + (time * 0.73) * -0.34;
		float yc = (fs / 5.0 - 0.5) * 1.36 + 0.11 * sin(p.x * 2.16 + sp) + 0.09 * sin(p.x * 2.52 - sp * 0.63);
		float wd = 0.14 + 0.06 * sin(p.x * 1.80 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.71);
		band *= 0.75 + 0.28 * sin(dd * 2.49 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.620, 3.659, 5.699) + fs * 0.64 + (time * 0.73) * 0.29);
		col += tone * band * 0.42;
	}
	col = col / (1.0 + col * 0.51);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.993, 1.000, 0.988);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
