uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.31;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 2.09 + (time * 0.50) * 1.79), cos(q.x * 2.86 - (time * 0.50) * 1.08));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.84, 1.68) + float(si) * 0.64 + (time * 0.50) * 0.76)) * (0.0048 / (abs(sin(q.x * 3.23) + sin(q.y * 4.93)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.941, 0.997) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
