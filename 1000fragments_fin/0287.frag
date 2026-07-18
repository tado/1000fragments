uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.38;
	p *= 2.07;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.07 * vec2(sin(q.y * 3.92 + (time * 0.59) * 2.42), cos(q.x * 3.68 - (time * 0.59) * 1.76));
		col += (0.5 + 0.5 * cos(vec3(1.761, 3.099, 4.438) + float(si) * 1.15 + (time * 0.59) * 0.86)) * (0.0038 / (abs(sin(q.x * 2.39) + sin(q.y * 4.88)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.017, 0.997, 0.952);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
