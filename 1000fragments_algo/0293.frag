uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.54) * 0.91), cos((time * 0.54) * 0.70)) * 0.21;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.05 * vec2(sin(q.y * 4.00 + (time * 0.54) * 2.43), cos(q.x * 3.92 - (time * 0.54) * 1.79));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.83, 1.67) + float(si) * 0.63 + (time * 0.54) * 0.44)) * (0.0077 / (abs(sin(q.x * 3.23) + sin(q.y * 5.10)) + 0.06));
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.29 + (time * 0.54) * 6.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 0.975, 0.938) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
