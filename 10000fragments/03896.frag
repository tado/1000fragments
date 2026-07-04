uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.09 * vec2(sin(q.y * 2.83 + time * 1.57), cos(q.x * 1.72 - time * 0.61));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.83 + time * 0.69)) * (0.0077 / (abs(sin(q.x * 5.38) + sin(q.y * 2.06)) + 0.14));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
