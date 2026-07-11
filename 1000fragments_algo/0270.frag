uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x += p.y * 0.79;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 2.72 + (time * 0.67) * 1.37), cos(q.x * 2.99 - (time * 0.67) * 1.53));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.03) + float(si) * 0.80 + (time * 0.67) * 0.73)) * (0.0095 / (abs(sin(q.x * 2.73) + sin(q.y * 5.91)) + 0.10));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.05 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.994, 1.005) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
