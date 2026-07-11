uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.07 * vec2(sin(q.y * 2.02 + time * 0.72), cos(q.x * 3.31 - time * 0.75));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.90 + time * 0.84)) * (0.0078 / (abs(sin(q.x * 2.77) + sin(q.y * 4.84)) + 0.14));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.59 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
