uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.05 * vec2(sin(q.y * 2.69 + time * 1.30), cos(q.x * 3.29 - time * 1.68));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.33 + time * 0.75)) * (0.0073 / (abs(sin(q.x * 2.51) + sin(q.y * 3.23)) + 0.07));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.19 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
