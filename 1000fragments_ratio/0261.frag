uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.08 * vec2(sin(q.y * 3.57 + (time * 0.71) * 1.95), cos(q.x * 1.85 - (time * 0.71) * 1.38));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.96, 1.92) + float(si) * 0.58 + (time * 0.71) * 0.23)) * (0.0062 / (abs(sin(q.x * 5.27) + sin(q.y * 4.52)) + 0.13));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 0.995, 0.946) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
