uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.09 * vec2(sin(q.y * 1.98 + (time * 0.69) * 0.98), cos(q.x * 2.14 - (time * 0.69) * 2.36));
		col += (0.5 + 0.5 * cos(vec3(5.418, 6.416, 7.414) + float(si) * 0.31 + (time * 0.69) * 0.70)) * (0.0051 / (abs(sin(q.x * 2.93) + sin(q.y * 6.00)) + 0.13));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.017, 0.993, 0.938);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
