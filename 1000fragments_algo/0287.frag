uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y += sin(p.x * 1.30 + (time * 0.78) * 0.74) * 0.10;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.05 * vec2(sin(q.y * 2.19 + (time * 0.78) * 0.77), cos(q.x * 2.38 - (time * 0.78) * 0.89));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.00, 2.01) + float(si) * 1.15 + (time * 0.78) * 0.56)) * (0.0038 / (abs(sin(q.x * 4.55) + sin(q.y * 5.14)) + 0.07));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 0.961, 1.029) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
