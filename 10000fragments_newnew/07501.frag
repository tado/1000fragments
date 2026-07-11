uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 2.27 + time * 2.14), cos(q.x * 3.43 - time * 2.36));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.19 + time * 0.78)) * (0.0080 / (abs(sin(q.x * 2.73) + sin(q.y * 4.28)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.04, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
