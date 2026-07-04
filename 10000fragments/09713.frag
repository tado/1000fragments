uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.04 * vec2(sin(q.y * 1.91 + time * 1.23), cos(q.x * 3.54 - time * 0.84));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.01 + time * 0.36)) * (0.0082 / (abs(sin(q.x * 3.14) + sin(q.y * 4.73)) + 0.11));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
