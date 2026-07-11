uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.73) * 0.58), cos((time * 0.73) * 0.53)) * 0.18;
	p *= 2.73;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.04 * vec2(sin(q.y * 2.34 + (time * 0.73) * 2.43), cos(q.x * 3.87 - (time * 0.73) * 1.22));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.44, 0.87) + float(si) * 0.93 + (time * 0.73) * 0.45)) * (0.0059 / (abs(sin(q.x * 3.25) + sin(q.y * 4.53)) + 0.14));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 0.997, 0.940) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
