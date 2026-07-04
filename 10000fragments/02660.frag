uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.07 * vec2(sin(q.y * 2.64 + time * 1.69), cos(q.x * 3.54 - time * 1.34));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.12 + time * 0.94)) * (0.0064 / (abs(sin(q.x * 3.16) + sin(q.y * 4.41)) + 0.13));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
