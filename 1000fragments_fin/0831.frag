uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	vec3 col = mix(vec3(0.041, 0.045, 0.069), vec3(0.055, 0.076, 0.075), clamp(0.5 + p.y * -0.08 + p.x * 0.12, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 1.23 + (time * 0.88) * 0.46;
		float yc = (fs / 6.0 - 0.5) * 0.95 + 0.14 * sin(p.x * 1.11 + sp) + 0.14 * sin(p.x * 2.52 - sp * 0.63);
		float wd = 0.08 + 0.03 * sin(p.x * 0.80 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.91);
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.664, 4.577, 6.490) + fs * 0.84 + (time * 0.88) * 0.33);
		col += tone * band * 0.44;
	}
	col = col / (1.0 + col * 0.31);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.006, 0.957, 0.996);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
