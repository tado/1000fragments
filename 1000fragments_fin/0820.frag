uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.50;
	p.y += sin(p.x * 1.04 + (time * 0.69) * 1.04) * 0.18;
	vec3 col = vec3(0.07, 0.11, 0.06);
	for(int si = 0; si < 8; si++){
		float fs = float(si);
		float sp = fs * 1.31 + (time * 0.69) * 0.33;
		float yc = (fs / 8.0 - 0.5) * 1.57 + 0.10 * sin(p.x * 2.07 + sp) + 0.10 * sin(p.x * 2.55 - sp * 0.63);
		float wd = 0.11 + 0.03 * sin(p.x * 1.42 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.90);
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.562, 7.542, 9.523) + fs * 0.36 + (time * 0.69) * 0.15);
		col = 1.0 - (1.0 - col) * (1.0 - tone * band * 0.36);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.986, 1.009, 0.994);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
