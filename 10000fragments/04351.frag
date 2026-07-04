uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 2.74 + time * 0.65), cos(q.x * 2.32 - time * 1.18));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.70 + time * 0.61)) * (0.0090 / (abs(sin(q.x * 3.46) + sin(q.y * 5.50)) + 0.10));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
