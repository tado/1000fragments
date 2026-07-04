uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 2.94 + time * 2.27), cos(q.x * 2.79 - time * 1.23));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.43 + time * 0.94)) * (0.0055 / (abs(sin(q.x * 5.18) + sin(q.y * 5.97)) + 0.09));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.12 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
