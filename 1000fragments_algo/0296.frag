uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.23 + (time * 0.84) * 0.97) * 0.07;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.10 * vec2(sin(q.y * 3.06 + (time * 0.84) * 0.63), cos(q.x * 3.20 - (time * 0.84) * 1.07));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.51, 1.02) + float(si) * 0.92 + (time * 0.84) * 0.45)) * (0.0042 / (abs(sin(q.x * 3.64) + sin(q.y * 2.60)) + 0.08));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 1.007, 0.931) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
