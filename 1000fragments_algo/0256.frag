uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.07 * vec2(sin(q.y * 1.67 + (time * 0.59) * 1.47), cos(q.x * 3.79 - (time * 0.59) * 2.08));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.66, 1.32) + float(si) * 0.67 + (time * 0.59) * 0.46)) * (0.0051 / (abs(sin(q.x * 2.31) + sin(q.y * 5.56)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.975, 1.022) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
