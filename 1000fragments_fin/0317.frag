uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.09 * vec2(sin(q.y * 3.28 + (time * 0.85) * 0.80), cos(q.x * 2.23 - (time * 0.85) * 2.02));
		col += (0.5 + 0.5 * cos(vec3(1.166, 3.226, 5.285) + float(si) * 0.68 + (time * 0.85) * 0.71)) * (0.0099 / (abs(sin(q.x * 3.89) + sin(q.y * 4.67)) + 0.15));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.027, 0.983, 0.962);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
