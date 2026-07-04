uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.09 * vec2(sin(q.y * 2.64 + time * 0.92), cos(q.x * 1.67 - time * 1.10));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.80 + time * 0.73)) * (0.0087 / (abs(sin(q.x * 2.36) + sin(q.y * 4.02)) + 0.07));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
