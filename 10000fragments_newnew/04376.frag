uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.10 * vec2(sin(q.y * 1.57 + time * 1.38), cos(q.x * 3.06 - time * 1.56));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.19 + time * 0.61)) * (0.0066 / (abs(sin(q.x * 4.50) + sin(q.y * 2.98)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
