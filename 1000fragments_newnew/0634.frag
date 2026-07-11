uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.10 * vec2(sin(q.y * 2.82 + (time * 0.52) * 1.72), cos(q.x * 3.94 - (time * 0.52) * 1.79));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.85, 1.70) + float(si) * 0.49 + (time * 0.52) * 0.31)) * (0.0076 / (abs(sin(q.x * 3.20) + sin(q.y * 4.73)) + 0.14));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.993, 0.993) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
