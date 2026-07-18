uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.43;
	p = p.yx;
	p *= 2.46;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.09 * vec2(sin(q.y * 3.37 + (time * 0.68) * 1.92), cos(q.x * 3.13 - (time * 0.68) * 2.31));
		col += (0.5 + 0.5 * cos(vec3(2.726, 4.687, 6.647) + float(si) * 0.48 + (time * 0.68) * 0.85)) * (0.0064 / (abs(sin(q.x * 2.28) + sin(q.y * 3.48)) + 0.14));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.989, 1.007, 0.950);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
