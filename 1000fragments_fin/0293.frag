uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.55;
	p *= 1.23;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.09 * vec2(sin(q.y * 1.97 + (time * 0.91) * 0.97), cos(q.x * 2.42 - (time * 0.91) * 1.42));
		col += (0.5 + 0.5 * cos(vec3(2.526, 3.969, 5.412) + float(si) * 0.77 + (time * 0.91) * 0.48)) * (0.0040 / (abs(sin(q.x * 4.15) + sin(q.y * 2.05)) + 0.14));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.050, 1.002, 0.941);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
