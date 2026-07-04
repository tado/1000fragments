uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 3.45 + time * 1.69), cos(q.x * 1.69 - time * 1.80));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.79 + time * 0.80)) * (0.0084 / (abs(sin(q.x * 4.11) + sin(q.y * 3.51)) + 0.06));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
