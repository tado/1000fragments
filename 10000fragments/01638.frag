uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.10 * vec2(sin(q.y * 2.06 + time * 2.15), cos(q.x * 1.99 - time * 2.01));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.91 + time * 0.70)) * (0.0051 / (abs(sin(q.x * 5.07) + sin(q.y * 3.72)) + 0.11));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
