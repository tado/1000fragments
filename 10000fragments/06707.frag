uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.09 * vec2(sin(q.y * 2.49 + time * 1.88), cos(q.x * 3.77 - time * 1.25));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.12 + time * 0.22)) * (0.0070 / (abs(sin(q.x * 5.36) + sin(q.y * 5.90)) + 0.06));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 1.53 + time * 13.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
