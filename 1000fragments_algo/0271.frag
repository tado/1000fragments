uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.80 + (time * 0.66) * 0.81) * 0.12;
	p = p.yx;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.04 * vec2(sin(q.y * 3.89 + (time * 0.66) * 1.92), cos(q.x * 3.71 - (time * 0.66) * 2.19));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.68, 1.36) + float(si) * 0.81 + (time * 0.66) * 0.98)) * (0.0084 / (abs(sin(q.x * 4.74) + sin(q.y * 3.12)) + 0.11));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.004, 1.020) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
