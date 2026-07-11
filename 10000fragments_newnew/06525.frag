uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.05 * vec2(sin(q.y * 3.93 + time * 1.79), cos(q.x * 2.18 - time * 1.71));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.13 + time * 0.64)) * (0.0059 / (abs(sin(q.x * 3.34) + sin(q.y * 5.38)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
