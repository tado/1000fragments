uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.55;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.07 * vec2(sin(q.y * 3.05 + (time * 0.82) * 2.05), cos(q.x * 3.78 - (time * 0.82) * 1.33));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.54, 3.07) + float(si) * 0.99 + (time * 0.82) * 0.84)) * (0.0080 / (abs(sin(q.x * 2.62) + sin(q.y * 3.73)) + 0.08));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.016, 0.950) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
