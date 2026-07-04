uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.05 * vec2(sin(q.y * 2.68 + time * 0.83), cos(q.x * 1.67 - time * 0.91));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.47 + time * 0.61)) * (0.0076 / (abs(sin(q.x * 3.26) + sin(q.y * 5.05)) + 0.12));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
