uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.08 + (time * 0.87) * 0.89) * 0.17;
	p.y += sin(p.x * 1.40 + (time * 0.87) * 0.48) * 0.16;
	vec3 col = mix(vec3(0.014, 0.028, 0.060), vec3(0.016, 0.020, 0.051), clamp(0.5 + p.y * 0.08 + p.x * -0.13, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 2.00 + (time * 0.87) * 0.23;
		float yc = (fs / 6.0 - 0.5) * 1.50 + 0.12 * sin(p.x * 1.60 + sp) + 0.05 * sin(p.x * 3.95 - sp * 0.63);
		float wd = 0.06 + 0.06 * sin(p.x * 0.74 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.89);
		band *= 0.61 + 0.34 * sin(dd * 2.57 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.980, 6.462, 7.943) + fs * 0.78 + (time * 0.87) * 0.40);
		col += tone * band * 0.46;
	}
	col = col / (1.0 + col * 0.32);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.993, 1.005, 1.007);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
