uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.07 * vec2(sin(q.y * 3.83 + time * 1.87), cos(q.x * 2.67 - time * 1.76));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.67 + time * 0.36)) * (0.0079 / (abs(sin(q.x * 4.88) + sin(q.y * 5.06)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
