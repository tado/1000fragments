uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 2.82 + time * 1.96), cos(q.x * 1.63 - time * 1.65));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.65 + time * 0.96)) * (0.0092 / (abs(sin(q.x * 4.47) + sin(q.y * 2.55)) + 0.11));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
