uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.04 * vec2(sin(q.y * 3.14 + time * 0.61), cos(q.x * 1.79 - time * 1.56));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.13 + time * 0.28)) * (0.0056 / (abs(sin(q.x * 5.59) + sin(q.y * 3.67)) + 0.05));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
