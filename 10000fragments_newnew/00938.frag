uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 1.62 + time * 1.64), cos(q.x * 2.13 - time * 1.02));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.04 + time * 0.77)) * (0.0098 / (abs(sin(q.x * 4.84) + sin(q.y * 2.43)) + 0.07));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 2.80 + time * 17.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
