uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.08 * vec2(sin(q.y * 3.45 + time * 0.72), cos(q.x * 1.89 - time * 1.88));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.79 + time * 0.24)) * (0.0099 / (abs(sin(q.x * 5.35) + sin(q.y * 5.55)) + 0.10));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.99 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
