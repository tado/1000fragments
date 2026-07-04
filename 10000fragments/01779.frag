uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 3.66 + time * 1.17), cos(q.x * 2.83 - time * 1.34));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.41 + time * 0.92)) * (0.0035 / (abs(sin(q.x * 5.33) + sin(q.y * 2.99)) + 0.08));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
