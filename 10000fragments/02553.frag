uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.05 * vec2(sin(q.y * 2.72 + time * 2.01), cos(q.x * 2.74 - time * 1.97));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.83 + time * 0.48)) * (0.0064 / (abs(sin(q.x * 5.98) + sin(q.y * 5.42)) + 0.05));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
