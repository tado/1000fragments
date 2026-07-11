uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.65) * 0.79), cos((time * 0.65) * 0.92)) * 0.20;
	p = p.yx;
	p *= 1.25;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.06 * vec2(sin(q.y * 3.43 + (time * 0.65) * 1.72), cos(q.x * 3.35 - (time * 0.65) * 1.50));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.04, 2.08) + float(si) * 0.31 + (time * 0.65) * 0.82)) * (0.0058 / (abs(sin(q.x * 4.84) + sin(q.y * 3.97)) + 0.13));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 0.988, 0.949) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
