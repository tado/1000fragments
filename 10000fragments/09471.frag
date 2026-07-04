uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.08 * vec2(sin(q.y * 3.51 + time * 0.53), cos(q.x * 3.62 - time * 1.56));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.71 + time * 0.61)) * (0.0097 / (abs(sin(q.x * 4.72) + sin(q.y * 4.44)) + 0.08));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
