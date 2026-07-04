uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.06 * vec2(sin(q.y * 3.61 + time * 0.72), cos(q.x * 1.53 - time * 2.14));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.38 + time * 0.57)) * (0.0078 / (abs(sin(q.x * 5.31) + sin(q.y * 5.47)) + 0.08));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
