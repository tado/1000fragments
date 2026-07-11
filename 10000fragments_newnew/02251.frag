uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.04 * vec2(sin(q.y * 2.16 + time * 1.92), cos(q.x * 3.61 - time * 1.01));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.62 + time * 0.63)) * (0.0096 / (abs(sin(q.x * 3.29) + sin(q.y * 3.71)) + 0.10));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
