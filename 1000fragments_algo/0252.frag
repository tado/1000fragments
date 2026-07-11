uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.76 + (time * 0.63) * 0.96) * 0.15;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.08 * vec2(sin(q.y * 2.25 + (time * 0.63) * 1.22), cos(q.x * 1.88 - (time * 0.63) * 1.25));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.47, 0.94) + float(si) * 0.51 + (time * 0.63) * 0.28)) * (0.0083 / (abs(sin(q.x * 4.48) + sin(q.y * 4.94)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.939, 0.969, 1.034) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
