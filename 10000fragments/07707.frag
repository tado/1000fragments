uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.04 * vec2(sin(q.y * 2.56 + time * 1.26), cos(q.x * 3.54 - time * 1.19));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.92 + time * 0.81)) * (0.0077 / (abs(sin(q.x * 4.81) + sin(q.y * 2.44)) + 0.14));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
