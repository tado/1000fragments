uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 3.74 + time * 2.41), cos(q.x * 3.97 - time * 1.82));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.87 + time * 0.79)) * (0.0091 / (abs(sin(q.x * 5.80) + sin(q.y * 2.02)) + 0.15));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
