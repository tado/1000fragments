uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.38 + (time * 0.90) * 0.56) * 0.08;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.05 * vec2(sin(q.y * 2.20 + (time * 0.90) * 0.68), cos(q.x * 2.39 - (time * 0.90) * 2.22));
		col += (0.5 + 0.5 * cos(vec3(2.191, 4.254, 6.317) + float(si) * 0.53 + (time * 0.90) * 0.49)) * (0.0090 / (abs(sin(q.x * 5.89) + sin(q.y * 2.46)) + 0.08));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.001, 0.993, 0.990);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
