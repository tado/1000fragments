uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.05 * vec2(sin(q.y * 2.09 + time * 1.99), cos(q.x * 2.76 - time * 0.87));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.85 + time * 0.58)) * (0.0053 / (abs(sin(q.x * 3.01) + sin(q.y * 3.27)) + 0.07));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
