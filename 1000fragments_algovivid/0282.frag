uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.21;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.08 * vec2(sin(q.y * 3.39 + (time * 0.76) * 2.04), cos(q.x * 1.51 - (time * 0.76) * 2.15));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.18, 2.37) + float(si) * 0.36 + (time * 0.76) * 0.66)) * (0.0090 / (abs(sin(q.x * 4.73) + sin(q.y * 2.31)) + 0.15));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.963, 1.009, 0.954) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
