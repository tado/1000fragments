uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.05 * vec2(sin(q.y * 1.90 + (time * 0.61) * 2.20), cos(q.x * 1.72 - (time * 0.61) * 2.28));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.88, 1.76) + float(si) * 0.56 + (time * 0.61) * 0.52)) * (0.0086 / (abs(sin(q.x * 3.50) + sin(q.y * 2.73)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.951, 1.009, 0.939) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
