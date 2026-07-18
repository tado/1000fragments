uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p *= 1.44;
	p *= 1.09;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 2.18 + (time * 0.58) * 1.13), cos(q.x * 3.77 - (time * 0.58) * 0.58));
		col += (0.5 + 0.5 * cos(vec3(2.937, 3.902, 4.866) + float(si) * 0.66 + (time * 0.58) * 0.46)) * (0.0070 / (abs(sin(q.x * 4.96) + sin(q.y * 5.80)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.942, 0.976, 1.048);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
