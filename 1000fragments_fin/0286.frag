uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.87) * 1.17), cos((time * 0.87) * 0.52)) * 0.07;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.09 * vec2(sin(q.y * 3.10 + (time * 0.87) * 1.87), cos(q.x * 2.90 - (time * 0.87) * 1.29));
		col += (0.5 + 0.5 * cos(vec3(0.834, 2.355, 3.877) + float(si) * 0.53 + (time * 0.87) * 0.61)) * (0.0057 / (abs(sin(q.x * 2.04) + sin(q.y * 2.27)) + 0.06));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.968, 1.011, 0.954);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
