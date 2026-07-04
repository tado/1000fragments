uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.04 * vec2(sin(q.y * 3.26 + time * 1.01), cos(q.x * 3.79 - time * 2.05));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.15 + time * 0.41)) * (0.0075 / (abs(sin(q.x * 2.59) + sin(q.y * 3.27)) + 0.11));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
