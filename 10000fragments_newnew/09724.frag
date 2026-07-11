uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.05 * vec2(sin(q.y * 2.59 + time * 1.07), cos(q.x * 1.78 - time * 0.57));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.97 + time * 0.73)) * (0.0060 / (abs(sin(q.x * 4.98) + sin(q.y * 5.24)) + 0.08));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.13 * sin(gl_FragCoord.y * 1.15 + time * 11.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
