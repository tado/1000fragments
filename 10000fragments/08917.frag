uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 2.84 + time * 1.90), cos(q.x * 1.65 - time * 0.75));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.98 + time * 0.27)) * (0.0041 / (abs(sin(q.x * 3.07) + sin(q.y * 2.95)) + 0.10));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
