uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.07 * vec2(sin(q.y * 1.72 + time * 1.18), cos(q.x * 2.11 - time * 0.90));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.87 + time * 0.53)) * (0.0072 / (abs(sin(q.x * 5.75) + sin(q.y * 5.65)) + 0.06));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 1.92 + time * 12.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
