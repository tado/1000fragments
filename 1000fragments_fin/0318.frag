uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.62 + (time * 0.64) * 1.11) * 0.15;
	p.x += p.y * 0.27;
	p *= 2.72;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.08 * vec2(sin(q.y * 1.92 + (time * 0.64) * 2.33), cos(q.x * 2.57 - (time * 0.64) * 0.75));
		col += (0.5 + 0.5 * cos(vec3(0.498, 2.426, 4.354) + float(si) * 0.65 + (time * 0.64) * 0.75)) * (0.0044 / (abs(sin(q.x * 5.50) + sin(q.y * 5.44)) + 0.13));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.009, 0.963, 1.009);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
