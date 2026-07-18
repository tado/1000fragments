uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.37;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.10 * vec2(sin(q.y * 1.68 + (time * 0.70) * 1.27), cos(q.x * 1.91 - (time * 0.70) * 0.68));
		col += (0.5 + 0.5 * cos(vec3(5.250, 6.590, 7.930) + float(si) * 0.33 + (time * 0.70) * 0.70)) * (0.0086 / (abs(sin(q.x * 5.46) + sin(q.y * 4.87)) + 0.11));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.934, 0.994, 1.043);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
