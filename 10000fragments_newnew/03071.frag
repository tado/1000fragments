uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.10 * vec2(sin(q.y * 3.37 + time * 1.08), cos(q.x * 3.69 - time * 0.96));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.19 + time * 0.59)) * (0.0050 / (abs(sin(q.x * 3.83) + sin(q.y * 4.00)) + 0.14));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
