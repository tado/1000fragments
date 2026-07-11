uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.04 * vec2(sin(q.y * 1.52 + time * 1.19), cos(q.x * 3.11 - time * 1.43));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.81 + time * 0.85)) * (0.0073 / (abs(sin(q.x * 5.84) + sin(q.y * 5.35)) + 0.11));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.29 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
