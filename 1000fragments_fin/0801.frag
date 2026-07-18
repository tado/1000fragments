uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.81) * 0.42), cos((time * 0.81) * 0.93)) * 0.05;
	p.x += p.y * 0.35;
	vec3 col = vec3(0.04, 0.04, 0.01);
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 1.53 + (time * 0.81) * 0.31;
		float yc = (fs / 6.0 - 0.5) * 1.03 + 0.14 * sin(p.x * 2.15 + sp) + 0.07 * sin(p.x * 1.92 - sp * 0.63);
		float wd = 0.11 + 0.04 * sin(p.x * 1.87 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.31);
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.583, 5.654, 7.725) + fs * 0.39 + (time * 0.81) * 0.30);
		col += tone * band * 0.32;
	}
	col = col / (1.0 + col * 0.37);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.007, 0.972, 0.955);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
