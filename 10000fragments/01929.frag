uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.05 * vec2(sin(q.y * 3.81 + time * 2.09), cos(q.x * 3.76 - time * 0.50));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.43 + time * 0.71)) * (0.0038 / (abs(sin(q.x * 3.37) + sin(q.y * 2.42)) + 0.15));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
