uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.09 * vec2(sin(q.y * 3.87 + time * 1.20), cos(q.x * 2.65 - time * 1.93));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.99 + time * 0.21)) * (0.0047 / (abs(sin(q.x * 3.17) + sin(q.y * 5.77)) + 0.09));
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 2.49 + time * 14.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
