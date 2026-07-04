uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.05 * vec2(sin(q.y * 3.82 + time * 2.36), cos(q.x * 2.44 - time * 1.60));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.34 + time * 0.50)) * (0.0032 / (abs(sin(q.x * 5.43) + sin(q.y * 2.25)) + 0.08));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
