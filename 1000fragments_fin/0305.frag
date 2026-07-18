uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.08;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.04 * vec2(sin(q.y * 3.30 + (time * 0.84) * 0.65), cos(q.x * 3.36 - (time * 0.84) * 0.71));
		col += (0.5 + 0.5 * cos(vec3(3.088, 4.032, 4.977) + float(si) * 1.10 + (time * 0.84) * 0.54)) * (0.0080 / (abs(sin(q.x * 5.30) + sin(q.y * 2.44)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.023, 0.978, 0.962);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
