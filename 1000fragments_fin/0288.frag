uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.71 + (time * 0.87) * 1.34) * 0.10;
	p *= 2.75;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.09 * vec2(sin(q.y * 1.77 + (time * 0.87) * 1.49), cos(q.x * 3.15 - (time * 0.87) * 1.86));
		col += (0.5 + 0.5 * cos(vec3(5.497, 7.183, 8.869) + float(si) * 0.97 + (time * 0.87) * 0.46)) * (0.0086 / (abs(sin(q.x * 4.24) + sin(q.y * 4.91)) + 0.10));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.55 + (time * 0.87) * 4.31);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.055, 1.014, 0.923);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
