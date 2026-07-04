uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.10 * vec2(sin(q.y * 3.80 + time * 2.32), cos(q.x * 3.01 - time * 1.59));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.46 + time * 0.49)) * (0.0044 / (abs(sin(q.x * 3.35) + sin(q.y * 2.36)) + 0.05));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
