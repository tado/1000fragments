uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.05 * vec2(sin(q.y * 1.53 + time * 1.12), cos(q.x * 2.42 - time * 1.53));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.63 + time * 0.27)) * (0.0086 / (abs(sin(q.x * 5.23) + sin(q.y * 5.07)) + 0.12));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
