uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.08 * vec2(sin(q.y * 3.26 + time * 1.50), cos(q.x * 1.83 - time * 0.94));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.98 + time * 0.91)) * (0.0096 / (abs(sin(q.x * 2.41) + sin(q.y * 5.37)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
