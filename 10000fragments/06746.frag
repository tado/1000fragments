uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 3.39 + time * 1.59), cos(q.x * 3.45 - time * 2.03));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.41 + time * 0.35)) * (0.0069 / (abs(sin(q.x * 4.96) + sin(q.y * 4.70)) + 0.14));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 2.31 + time * 8.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
