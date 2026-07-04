uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.09 * vec2(sin(q.y * 1.83 + time * 0.95), cos(q.x * 3.46 - time * 2.16));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.04 + time * 0.58)) * (0.0039 / (abs(sin(q.x * 2.91) + sin(q.y * 4.31)) + 0.14));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 1.54 + time * 17.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
