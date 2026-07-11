uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.04 * vec2(sin(q.y * 3.41 + time * 0.68), cos(q.x * 3.42 - time * 1.67));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.93 + time * 0.62)) * (0.0050 / (abs(sin(q.x * 3.21) + sin(q.y * 4.26)) + 0.10));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 1.22 + time * 9.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
