uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.09 * vec2(sin(q.y * 3.91 + time * 1.42), cos(q.x * 1.81 - time * 1.96));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.98 + time * 0.22)) * (0.0041 / (abs(sin(q.x * 3.76) + sin(q.y * 4.72)) + 0.14));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
