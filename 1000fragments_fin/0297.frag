uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.32;
	p.x += p.y * -0.62;
	p *= 1.08;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.07 * vec2(sin(q.y * 1.87 + (time * 0.73) * 0.53), cos(q.x * 3.80 - (time * 0.73) * 2.03));
		col += (0.5 + 0.5 * cos(vec3(4.580, 5.913, 7.246) + float(si) * 0.79 + (time * 0.73) * 0.90)) * (0.0099 / (abs(sin(q.x * 5.31) + sin(q.y * 2.69)) + 0.15));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.928, 0.989, 1.051);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
