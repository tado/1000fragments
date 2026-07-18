uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.47;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 2.57 + (time * 0.62) * 2.00), cos(q.x * 1.66 - (time * 0.62) * 2.43));
		col += (0.5 + 0.5 * cos(vec3(6.121, 7.821, 9.521) + float(si) * 1.09 + (time * 0.62) * 0.46)) * (0.0090 / (abs(sin(q.x * 5.98) + sin(q.y * 2.47)) + 0.15));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.003, 0.960, 0.999);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
