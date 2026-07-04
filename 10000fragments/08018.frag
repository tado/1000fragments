uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.06 * vec2(sin(q.y * 1.87 + time * 1.29), cos(q.x * 1.88 - time * 2.25));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.40 + time * 0.74)) * (0.0034 / (abs(sin(q.x * 3.51) + sin(q.y * 5.04)) + 0.12));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
