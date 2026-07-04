uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.09 * vec2(sin(q.y * 3.42 + time * 1.82), cos(q.x * 3.87 - time * 1.20));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.64 + time * 0.62)) * (0.0041 / (abs(sin(q.x * 2.29) + sin(q.y * 5.06)) + 0.08));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
