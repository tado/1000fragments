uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 3.72 + time * 1.24), cos(q.x * 3.81 - time * 2.06));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.94 + time * 0.99)) * (0.0076 / (abs(sin(q.x * 3.27) + sin(q.y * 2.86)) + 0.11));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
