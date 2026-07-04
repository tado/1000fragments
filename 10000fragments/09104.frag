uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.06 * vec2(sin(q.y * 2.31 + time * 0.80), cos(q.x * 2.08 - time * 2.25));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.04 + time * 0.99)) * (0.0066 / (abs(sin(q.x * 6.00) + sin(q.y * 3.66)) + 0.12));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
