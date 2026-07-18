uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.08 * vec2(sin(q.y * 3.27 + (time * 0.57) * 2.06), cos(q.x * 3.04 - (time * 0.57) * 0.55));
		col += (0.5 + 0.5 * cos(vec3(5.919, 7.573, 9.228) + float(si) * 0.77 + (time * 0.57) * 0.97)) * (0.0080 / (abs(sin(q.x * 5.73) + sin(q.y * 2.23)) + 0.05));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.928, 0.977, 1.037);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
