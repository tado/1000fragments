uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.05 * vec2(sin(q.y * 3.20 + time * 1.36), cos(q.x * 3.61 - time * 0.54));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.08 + time * 0.62)) * (0.0041 / (abs(sin(q.x * 2.28) + sin(q.y * 3.91)) + 0.10));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
