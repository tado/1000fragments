uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.05 * vec2(sin(q.y * 3.39 + time * 2.30), cos(q.x * 2.35 - time * 1.78));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.74 + time * 0.21)) * (0.0048 / (abs(sin(q.x * 5.94) + sin(q.y * 3.84)) + 0.08));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.38 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
