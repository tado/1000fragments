uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p += vec2(sin((time * 0.59) * 1.03), cos((time * 0.59) * 0.55)) * 0.10;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.04 * vec2(sin(q.y * 2.43 + (time * 0.59) * 1.84), cos(q.x * 3.82 - (time * 0.59) * 1.30));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.74, 1.47) + float(si) * 0.85 + (time * 0.59) * 0.81)) * (0.0048 / (abs(sin(q.x * 3.82) + sin(q.y * 4.38)) + 0.14));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 0.980, 0.915) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
