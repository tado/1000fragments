uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.88 + (time * 0.77) * 1.39) * 0.07;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.07 * vec2(sin(q.y * 3.25 + (time * 0.77) * 0.68), cos(q.x * 2.22 - (time * 0.77) * 1.50));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.00, 1.99) + float(si) * 0.73 + (time * 0.77) * 0.84)) * (0.0055 / (abs(sin(q.x * 2.45) + sin(q.y * 5.06)) + 0.08));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.980, 1.003) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
