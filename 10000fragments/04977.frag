uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.08 * vec2(sin(q.y * 2.75 + time * 1.92), cos(q.x * 1.81 - time * 2.50));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.61 + time * 0.73)) * (0.0065 / (abs(sin(q.x * 4.37) + sin(q.y * 3.99)) + 0.08));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
