uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.07 * vec2(sin(q.y * 2.96 + (time * 0.63) * 0.92), cos(q.x * 4.00 - (time * 0.63) * 0.58));
		col += (0.5 + 0.5 * cos(vec3(4.709, 6.032, 7.354) + float(si) * 0.38 + (time * 0.63) * 0.27)) * (0.0065 / (abs(sin(q.x * 5.27) + sin(q.y * 4.86)) + 0.12));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.999, 1.005, 0.989);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
