uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.04 * vec2(sin(q.y * 1.78 + time * 0.65), cos(q.x * 2.50 - time * 1.78));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.38 + time * 0.79)) * (0.0051 / (abs(sin(q.x * 4.39) + sin(q.y * 5.88)) + 0.07));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
