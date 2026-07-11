uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.07 * vec2(sin(q.y * 2.55 + time * 1.00), cos(q.x * 3.54 - time * 2.47));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.06 + time * 0.85)) * (0.0063 / (abs(sin(q.x * 2.54) + sin(q.y * 3.10)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 2.37 + time * 4.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
