uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.06 * vec2(sin(q.y * 2.63 + time * 1.93), cos(q.x * 3.93 - time * 1.93));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.41 + time * 0.27)) * (0.0038 / (abs(sin(q.x * 3.36) + sin(q.y * 3.95)) + 0.14));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
