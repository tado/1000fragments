uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.06 * vec2(sin(q.y * 3.55 + time * 1.04), cos(q.x * 3.42 - time * 2.09));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.39 + time * 0.49)) * (0.0057 / (abs(sin(q.x * 4.72) + sin(q.y * 3.88)) + 0.12));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 2.49 + time * 8.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
