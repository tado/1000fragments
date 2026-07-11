uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.08 * vec2(sin(q.y * 2.02 + time * 1.13), cos(q.x * 3.80 - time * 2.21));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.41 + time * 0.27)) * (0.0053 / (abs(sin(q.x * 3.45) + sin(q.y * 3.90)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.00 + time * 12.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
