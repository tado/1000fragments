uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 2.74 + time * 1.45), cos(q.x * 3.03 - time * 1.52));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.48 + time * 0.52)) * (0.0096 / (abs(sin(q.x * 5.69) + sin(q.y * 2.18)) + 0.15));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 1.33 + time * 12.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
