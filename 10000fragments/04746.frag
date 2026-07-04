uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 3.16 + time * 2.05), cos(q.x * 1.89 - time * 1.05));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.87 + time * 0.39)) * (0.0052 / (abs(sin(q.x * 2.07) + sin(q.y * 2.85)) + 0.13));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.85 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
