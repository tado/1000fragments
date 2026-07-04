uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.07 * vec2(sin(q.y * 3.08 + time * 2.10), cos(q.x * 3.73 - time * 0.74));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.67 + time * 0.69)) * (0.0081 / (abs(sin(q.x * 4.41) + sin(q.y * 3.50)) + 0.15));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.16 * sin(gl_FragCoord.y * 1.34 + time * 13.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
