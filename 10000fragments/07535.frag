uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.05 * vec2(sin(q.y * 3.69 + time * 1.91), cos(q.x * 2.98 - time * 2.21));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.00 + time * 0.67)) * (0.0051 / (abs(sin(q.x * 3.64) + sin(q.y * 3.12)) + 0.12));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.91 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
