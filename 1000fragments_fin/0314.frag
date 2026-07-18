uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.57;
	p.x += p.y * 0.52;
	p *= 2.11;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 3.14 + (time * 0.57) * 1.23), cos(q.x * 3.38 - (time * 0.57) * 1.22));
		col += (0.5 + 0.5 * cos(vec3(3.803, 4.981, 6.158) + float(si) * 0.68 + (time * 0.57) * 0.23)) * (0.0036 / (abs(sin(q.x * 6.00) + sin(q.y * 4.41)) + 0.15));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.048, 1.001, 0.937);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
