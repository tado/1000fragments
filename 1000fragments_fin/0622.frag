uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.21;
	p.x += p.y * 0.26;
	p *= 2.08;
	vec2 z = p;
	vec2 c = vec2(0.04 + 0.28 * sin((time * 0.82) * 1.46), -0.38 + 0.07 * cos((time * 0.82) * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.83);
	float cc = clamp(0.5 + 0.5 * (v * 2.35), 0.0, 1.0);
	vec3 col = mix(vec3(0.029, 0.084, 0.091), vec3(0.903, 0.889, 0.849), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.967, 1.005, 0.930);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
