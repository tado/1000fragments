uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.90) * 0.72), cos((time * 0.90) * 0.32)) * 0.17;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 3.16 + (time * 0.90) * 1.32), cos(q.x * 1.72 - (time * 0.90) * 1.19));
		col += (0.5 + 0.5 * cos(vec3(4.973, 6.571, 8.169) + float(si) * 0.85 + (time * 0.90) * 0.90)) * (0.0052 / (abs(sin(q.x * 4.15) + sin(q.y * 4.30)) + 0.11));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.044, 1.007, 0.942);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
