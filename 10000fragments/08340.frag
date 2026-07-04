uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.08 * vec2(sin(q.y * 2.77 + time * 2.29), cos(q.x * 1.90 - time * 2.28));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.66 + time * 0.49)) * (0.0091 / (abs(sin(q.x * 4.79) + sin(q.y * 5.53)) + 0.12));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
