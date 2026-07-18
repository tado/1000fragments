uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x += p.y * 0.22;
	p *= 1.15;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.10 * vec2(sin(q.y * 3.78 + (time * 0.59) * 1.71), cos(q.x * 2.34 - (time * 0.59) * 0.63));
		col += (0.5 + 0.5 * cos(vec3(4.398, 6.021, 7.645) + float(si) * 0.33 + (time * 0.59) * 0.95)) * (0.0095 / (abs(sin(q.x * 4.63) + sin(q.y * 2.24)) + 0.10));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.993, 0.996, 1.003);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
