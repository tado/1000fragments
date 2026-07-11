uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.55;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.05 * vec2(sin(q.y * 1.81 + (time * 0.78) * 0.76), cos(q.x * 2.12 - (time * 0.78) * 2.41));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.57, 3.14) + float(si) * 1.18 + (time * 0.78) * 0.26)) * (0.0063 / (abs(sin(q.x * 3.80) + sin(q.y * 3.12)) + 0.06));
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.11 * sin(gl_FragCoord.y * 1.20 + (time * 0.78) * 14.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.996, 0.928) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
