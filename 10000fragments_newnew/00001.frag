uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.05 * vec2(sin(q.y * 2.53 + time * 1.58), cos(q.x * 1.78 - time * 0.74));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.58 + time * 0.99)) * (0.0093 / (abs(sin(q.x * 2.05) + sin(q.y * 5.28)) + 0.08));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 2.22 + time * 11.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
