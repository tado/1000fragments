uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p = p.yx;
	p.y += sin(p.x * 1.17 + (time * 0.62) * 0.35) * 0.06;
	vec3 col = mix(vec3(0.064, 0.037, 0.061), vec3(0.058, 0.032, 0.053), clamp(0.5 + p.y * 0.56 + p.x * 0.01, 0.0, 1.0));
	for(int si = 0; si < 5; si++){
		float fs = float(si);
		float sp = fs * 1.27 + (time * 0.62) * 0.38;
		float yc = (fs / 5.0 - 0.5) * 0.91 + 0.14 * sin(p.x * 1.92 + sp) + 0.07 * sin(p.x * 2.53 - sp * 0.63);
		float wd = 0.12 + 0.04 * sin(p.x * 1.02 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.93);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.359, 2.292, 4.225) + fs * 0.58 + (time * 0.62) * 0.22);
		col += tone * band * 0.32;
	}
	col = col / (1.0 + col * 0.61);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.028, 0.997, 0.925);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
