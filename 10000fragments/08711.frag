uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.09 * vec2(sin(q.y * 2.56 + time * 0.74), cos(q.x * 2.77 - time * 1.32));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.86 + time * 0.80)) * (0.0036 / (abs(sin(q.x * 2.99) + sin(q.y * 2.37)) + 0.11));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
