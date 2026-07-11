uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.39;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.04 * vec2(sin(q.y * 3.89 + (time * 0.71) * 0.59), cos(q.x * 3.65 - (time * 0.71) * 1.86));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.14, 2.27) + float(si) * 0.68 + (time * 0.71) * 0.70)) * (0.0033 / (abs(sin(q.x * 4.22) + sin(q.y * 3.07)) + 0.08));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 1.013, 1.019) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
