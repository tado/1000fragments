uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.73;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 1.86 + time * 1.62), cos(q.x * 3.10 - time * 0.53));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.77 + time * 0.97)) * (0.0059 / (abs(sin(q.x * 4.80) + sin(q.y * 3.07)) + 0.11));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
