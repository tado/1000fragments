uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.09 * vec2(sin(q.y * 2.85 + time * 1.37), cos(q.x * 3.10 - time * 1.49));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.46 + time * 0.22)) * (0.0090 / (abs(sin(q.x * 3.54) + sin(q.y * 2.76)) + 0.13));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
