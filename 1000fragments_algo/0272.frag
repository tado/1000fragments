uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.20;
	p += vec2(sin((time * 0.56) * 0.69), cos((time * 0.56) * 1.13)) * 0.18;
	p *= 2.27;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.06 * vec2(sin(q.y * 2.71 + (time * 0.56) * 0.81), cos(q.x * 2.59 - (time * 0.56) * 1.74));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.08, 2.17) + float(si) * 0.71 + (time * 0.56) * 0.29)) * (0.0080 / (abs(sin(q.x * 3.66) + sin(q.y * 2.69)) + 0.11));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 1.83 + (time * 0.56) * 6.04);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.993, 1.006) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
