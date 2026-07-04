uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.10 * vec2(sin(q.y * 2.81 + time * 0.58), cos(q.x * 3.72 - time * 1.42));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.38 + time * 0.68)) * (0.0059 / (abs(sin(q.x * 3.30) + sin(q.y * 4.32)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.52 + time * 15.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
