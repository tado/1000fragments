uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.07 * vec2(sin(q.y * 3.11 + time * 1.50), cos(q.x * 3.75 - time * 0.83));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.67 + time * 0.95)) * (0.0088 / (abs(sin(q.x * 3.71) + sin(q.y * 4.40)) + 0.08));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
