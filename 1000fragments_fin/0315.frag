uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.72;
	p *= 1.99;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.04 * vec2(sin(q.y * 3.20 + (time * 0.68) * 2.23), cos(q.x * 2.31 - (time * 0.68) * 1.85));
		col += (0.5 + 0.5 * cos(vec3(1.395, 3.261, 5.127) + float(si) * 1.19 + (time * 0.68) * 0.63)) * (0.0082 / (abs(sin(q.x * 3.72) + sin(q.y * 5.59)) + 0.15));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.977, 1.016, 0.940);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
