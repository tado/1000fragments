uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.10 * vec2(sin(q.y * 3.11 + time * 0.68), cos(q.x * 2.92 - time * 0.59));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.34 + time * 0.20)) * (0.0055 / (abs(sin(q.x * 2.85) + sin(q.y * 4.42)) + 0.09));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
