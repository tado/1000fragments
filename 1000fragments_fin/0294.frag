uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 2.95 + (time * 0.71) * 1.17), cos(q.x * 2.38 - (time * 0.71) * 1.02));
		col += (0.5 + 0.5 * cos(vec3(1.590, 3.513, 5.435) + float(si) * 0.68 + (time * 0.71) * 0.30)) * (0.0077 / (abs(sin(q.x * 3.15) + sin(q.y * 3.87)) + 0.14));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.022, 0.978, 0.961);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
