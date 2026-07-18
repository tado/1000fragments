uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.039, 0.051, 0.048), vec3(0.038, 0.053, 0.068), clamp(0.5 + p.y * -0.41 + p.x * 0.01, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 0.77 + (time * 0.68) * -0.24;
		float yc = (fs / 5.0 - 0.5) * 1.08 + 0.09 * sin(p.x * 2.19 + sp) + 0.05 * sin(p.x * 2.70 - sp * 0.63);
		float wd = 0.05 + 0.06 * sin(p.x * 1.45 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.74);
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.705, 6.919, 8.133) + fs * 0.73 + (time * 0.68) * 0.44);
		col += tone * band * 0.44;
	}
	col = col / (1.0 + col * 0.49);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.978, 1.012, 0.950);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
