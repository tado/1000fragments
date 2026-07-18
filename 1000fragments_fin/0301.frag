uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p.y = abs(p.y);
	p *= 1.98;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 2.09 + (time * 0.88) * 1.20), cos(q.x * 2.37 - (time * 0.88) * 1.93));
		col += (0.5 + 0.5 * cos(vec3(4.519, 5.325, 6.132) + float(si) * 0.43 + (time * 0.88) * 0.21)) * (0.0031 / (abs(sin(q.x * 4.30) + sin(q.y * 5.55)) + 0.12));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.982, 1.006, 0.953);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
