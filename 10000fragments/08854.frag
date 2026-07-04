uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.05 * vec2(sin(q.y * 1.81 + time * 1.37), cos(q.x * 3.26 - time * 2.06));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.85 + time * 0.29)) * (0.0080 / (abs(sin(q.x * 2.05) + sin(q.y * 5.48)) + 0.09));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
