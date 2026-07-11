uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.05 * vec2(sin(q.y * 1.72 + time * 1.30), cos(q.x * 1.82 - time * 0.63));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.06 + time * 0.36)) * (0.0045 / (abs(sin(q.x * 2.76) + sin(q.y * 4.27)) + 0.05));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
