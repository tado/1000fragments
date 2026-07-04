uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.05 * vec2(sin(q.y * 2.16 + time * 1.85), cos(q.x * 1.66 - time * 2.12));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.47 + time * 0.49)) * (0.0067 / (abs(sin(q.x * 5.78) + sin(q.y * 3.42)) + 0.13));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
