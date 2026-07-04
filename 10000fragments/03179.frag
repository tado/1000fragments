uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.07 * vec2(sin(q.y * 3.70 + time * 1.27), cos(q.x * 3.43 - time * 2.42));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.07 + time * 0.30)) * (0.0043 / (abs(sin(q.x * 2.63) + sin(q.y * 3.63)) + 0.14));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.76 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
