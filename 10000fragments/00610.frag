uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.06 * vec2(sin(q.y * 3.22 + time * 1.87), cos(q.x * 2.43 - time * 1.50));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.73 + time * 0.87)) * (0.0042 / (abs(sin(q.x * 3.96) + sin(q.y * 5.00)) + 0.07));
	}
	col = col / (1.0 + col);
	col *= 0.80 + 0.14 * sin(gl_FragCoord.y * 1.49 + time * 9.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
