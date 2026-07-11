uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 2.96 + time * 0.59), cos(q.x * 2.76 - time * 2.26));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.73 + time * 0.98)) * (0.0056 / (abs(sin(q.x * 5.96) + sin(q.y * 4.76)) + 0.13));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
