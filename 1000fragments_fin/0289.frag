uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.y = abs(p.y) - 0.52;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.09 * vec2(sin(q.y * 2.88 + (time * 0.87) * 2.09), cos(q.x * 2.03 - (time * 0.87) * 0.65));
		col += (0.5 + 0.5 * cos(vec3(0.132, 1.471, 2.811) + float(si) * 0.82 + (time * 0.87) * 0.79)) * (0.0046 / (abs(sin(q.x * 2.19) + sin(q.y * 4.66)) + 0.14));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.005, 0.999, 1.004);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
