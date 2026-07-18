uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.11;
	p.y += sin(p.x * 0.60 + (time * 0.58) * 0.59) * 0.13;
	vec3 col = mix(vec3(0.046, 0.047, 0.057), vec3(0.058, 0.027, 0.053), clamp(0.5 + p.y * 0.12 + p.x * -0.18, 0.0, 1.0));
	for(int si = 0; si < 7; si++){
		float fs = float(si);
		float sp = fs * 1.52 + (time * 0.58) * 0.19;
		float yc = (fs / 7.0 - 0.5) * 0.81 + 0.10 * sin(p.x * 1.98 + sp) + 0.06 * sin(p.x * 2.50 - sp * 0.63);
		float wd = 0.06 + 0.02 * sin(p.x * 0.62 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.27);
		band *= 0.68 + 0.34 * sin(dd * 3.48 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.435, 3.544, 4.654) + fs * 0.49 + (time * 0.58) * 0.27);
		col += tone * band * 0.54;
	}
	col = col / (1.0 + col * 0.42);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.943, 0.993, 1.051);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
