uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.10 * vec2(sin(q.y * 2.22 + time * 1.61), cos(q.x * 3.13 - time * 1.85));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.68 + time * 0.79)) * (0.0052 / (abs(sin(q.x * 3.04) + sin(q.y * 5.74)) + 0.13));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
