uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.61) * 0.49), cos((time * 0.61) * 1.09)) * 0.12;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.05 * vec2(sin(q.y * 2.06 + (time * 0.61) * 1.24), cos(q.x * 3.06 - (time * 0.61) * 1.32));
		col += (0.5 + 0.5 * cos(vec3(3.608, 5.000, 6.392) + float(si) * 0.79 + (time * 0.61) * 0.53)) * (0.0065 / (abs(sin(q.x * 3.78) + sin(q.y * 3.80)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.52 + (time * 0.61) * 4.71);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.962, 1.013, 0.956);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
