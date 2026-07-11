uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	p.y = abs(p.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.07 * vec2(sin(q.y * 3.22 + (time * 0.78) * 0.58), cos(q.x * 1.73 - (time * 0.78) * 1.74));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.46, 0.92) + float(si) * 0.95 + (time * 0.78) * 0.61)) * (0.0064 / (abs(sin(q.x * 3.58) + sin(q.y * 3.72)) + 0.08));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.004, 1.017, 0.999) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
