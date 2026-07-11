uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.y += sin(p.x * 1.49 + (time * 0.83) * 0.66) * 0.19;
	p *= 2.22;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.04 * vec2(sin(q.y * 3.99 + (time * 0.83) * 1.54), cos(q.x * 3.26 - (time * 0.83) * 1.90));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.23, 2.46) + float(si) * 0.41 + (time * 0.83) * 0.31)) * (0.0054 / (abs(sin(q.x * 3.93) + sin(q.y * 5.67)) + 0.13));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.948, 0.977, 1.029) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
