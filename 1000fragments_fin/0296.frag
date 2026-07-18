uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.58;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.06 * vec2(sin(q.y * 3.19 + (time * 0.63) * 1.42), cos(q.x * 3.19 - (time * 0.63) * 1.71));
		col += (0.5 + 0.5 * cos(vec3(0.874, 1.734, 2.594) + float(si) * 0.95 + (time * 0.63) * 0.62)) * (0.0042 / (abs(sin(q.x * 3.86) + sin(q.y * 2.82)) + 0.13));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.040, 1.004, 0.921);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
