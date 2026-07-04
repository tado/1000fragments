uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.09 * vec2(sin(q.y * 1.92 + time * 1.26), cos(q.x * 3.42 - time * 1.33));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.03 + time * 0.86)) * (0.0076 / (abs(sin(q.x * 4.45) + sin(q.y * 4.66)) + 0.12));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
