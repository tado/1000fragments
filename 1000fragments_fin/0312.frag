uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.y += sin(p.x * 2.19 + (time * 0.73) * 0.46) * 0.14;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 1.52 + (time * 0.73) * 1.05), cos(q.x * 1.75 - (time * 0.73) * 1.33));
		col += (0.5 + 0.5 * cos(vec3(3.596, 5.298, 7.001) + float(si) * 0.69 + (time * 0.73) * 0.26)) * (0.0097 / (abs(sin(q.x * 4.77) + sin(q.y * 4.06)) + 0.09));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.024, 0.974, 0.952);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
