uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.08 * vec2(sin(q.y * 1.86 + time * 2.25), cos(q.x * 1.63 - time * 1.92));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.02 + time * 0.28)) * (0.0058 / (abs(sin(q.x * 5.76) + sin(q.y * 5.72)) + 0.12));
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.60 + time * 7.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
