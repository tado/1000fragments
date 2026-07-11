uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.08 * vec2(sin(q.y * 2.52 + (time * 0.76) * 0.82), cos(q.x * 3.74 - (time * 0.76) * 2.49));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.41, 2.82) + float(si) * 1.11 + (time * 0.76) * 0.25)) * (0.0049 / (abs(sin(q.x * 2.02) + sin(q.y * 2.07)) + 0.09));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 1.014, 0.940) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
