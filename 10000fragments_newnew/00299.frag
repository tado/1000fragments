uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.08 * vec2(sin(q.y * 2.22 + time * 2.23), cos(q.x * 1.87 - time * 1.15));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.96 + time * 0.76)) * (0.0060 / (abs(sin(q.x * 4.60) + sin(q.y * 4.17)) + 0.11));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
