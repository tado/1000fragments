uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.05 * vec2(sin(q.y * 3.90 + time * 1.04), cos(q.x * 1.54 - time * 0.81));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.09 + time * 0.83)) * (0.0072 / (abs(sin(q.x * 5.54) + sin(q.y * 4.48)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
