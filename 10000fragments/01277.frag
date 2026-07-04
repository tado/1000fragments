uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.06 * vec2(sin(q.y * 2.51 + time * 1.08), cos(q.x * 3.16 - time * 1.22));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.51 + time * 0.53)) * (0.0096 / (abs(sin(q.x * 4.68) + sin(q.y * 2.03)) + 0.12));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
