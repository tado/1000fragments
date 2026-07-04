uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.05 * vec2(sin(q.y * 2.49 + time * 1.82), cos(q.x * 2.96 - time * 1.05));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.12 + time * 1.00)) * (0.0063 / (abs(sin(q.x * 5.48) + sin(q.y * 5.55)) + 0.10));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.98 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
