uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.07 * vec2(sin(q.y * 1.51 + time * 2.33), cos(q.x * 2.85 - time * 1.02));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.05 + time * 0.90)) * (0.0065 / (abs(sin(q.x * 4.38) + sin(q.y * 2.30)) + 0.12));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
