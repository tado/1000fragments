uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.10 * vec2(sin(q.y * 1.57 + time * 2.27), cos(q.x * 2.37 - time * 1.36));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.41 + time * 0.92)) * (0.0047 / (abs(sin(q.x * 5.72) + sin(q.y * 4.41)) + 0.11));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
