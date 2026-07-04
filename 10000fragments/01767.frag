uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.07 * vec2(sin(q.y * 3.05 + time * 1.20), cos(q.x * 2.50 - time * 0.77));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.03 + time * 0.38)) * (0.0044 / (abs(sin(q.x * 4.14) + sin(q.y * 4.31)) + 0.08));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
