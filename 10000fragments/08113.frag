uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.09 * vec2(sin(q.y * 2.53 + time * 1.59), cos(q.x * 1.56 - time * 0.95));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.38 + time * 0.87)) * (0.0039 / (abs(sin(q.x * 5.15) + sin(q.y * 5.07)) + 0.10));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
