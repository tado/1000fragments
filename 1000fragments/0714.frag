uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.07 * vec2(sin(q.y * 3.89 + time * 1.61), cos(q.x * 3.36 - time * 1.99));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.07 + time * 0.38)) * (0.0032 / (abs(sin(q.x * 5.43) + sin(q.y * 3.72)) + 0.12));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
