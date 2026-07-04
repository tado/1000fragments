uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 3.05 + time * 0.81), cos(q.x * 3.09 - time * 1.68));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.98 + time * 0.88)) * (0.0077 / (abs(sin(q.x * 2.56) + sin(q.y * 2.62)) + 0.15));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
