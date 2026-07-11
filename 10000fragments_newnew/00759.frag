uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.10 * vec2(sin(q.y * 2.16 + time * 2.42), cos(q.x * 1.58 - time * 0.61));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.39 + time * 0.43)) * (0.0040 / (abs(sin(q.x * 3.65) + sin(q.y * 5.68)) + 0.11));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.27 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
