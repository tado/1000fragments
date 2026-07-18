uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.49;
	p.y += sin(p.x * 1.99 + (time * 0.79) * 0.67) * 0.16;
	vec3 col = mix(vec3(0.053, 0.033, 0.075), vec3(0.075, 0.042, 0.109), clamp(0.5 + p.y * 0.64 + p.x * -0.23, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 1.71 + (time * 0.79) * 0.34;
		float yc = (fs / 6.0 - 0.5) * 1.45 + 0.11 * sin(p.x * 1.44 + sp) + 0.06 * sin(p.x * 3.34 - sp * 0.63);
		float wd = 0.05 + 0.03 * sin(p.x * 1.94 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 2.31);
		band *= 0.61 + 0.25 * sin(dd * 4.46 + sp * 2.3);
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.635, 2.583, 4.531) + fs * 0.30 + (time * 0.79) * 0.30);
		col += tone * band * 0.52;
	}
	col = col / (1.0 + col * 0.33);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.942, 0.990, 1.030);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
