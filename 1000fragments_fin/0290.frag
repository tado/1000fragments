uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.98;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.07 * vec2(sin(q.y * 3.81 + (time * 0.85) * 1.31), cos(q.x * 2.90 - (time * 0.85) * 1.08));
		col += (0.5 + 0.5 * cos(vec3(0.117, 1.619, 3.122) + float(si) * 0.44 + (time * 0.85) * 0.37)) * (0.0039 / (abs(sin(q.x * 4.46) + sin(q.y * 3.73)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.979, 0.995, 0.959);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
