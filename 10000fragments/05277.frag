uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.09 * vec2(sin(q.y * 3.72 + time * 1.51), cos(q.x * 2.86 - time * 0.72));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.48 + time * 0.62)) * (0.0078 / (abs(sin(q.x * 3.12) + sin(q.y * 5.05)) + 0.13));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
