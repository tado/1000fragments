uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.08 * vec2(sin(q.y * 3.07 + time * 1.21), cos(q.x * 2.88 - time * 0.70));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.81 + time * 0.53)) * (0.0044 / (abs(sin(q.x * 2.66) + sin(q.y * 4.10)) + 0.12));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
