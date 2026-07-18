uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.18 + (time * 0.90) * 1.02) * 0.07;
	p *= 2.71;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.09 * vec2(sin(q.y * 2.80 + (time * 0.90) * 1.48), cos(q.x * 2.09 - (time * 0.90) * 0.65));
		col += (0.5 + 0.5 * cos(vec3(2.467, 3.691, 4.916) + float(si) * 1.03 + (time * 0.90) * 0.76)) * (0.0082 / (abs(sin(q.x * 3.30) + sin(q.y * 4.41)) + 0.09));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.970, 1.003, 0.958);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
