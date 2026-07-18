uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.59) * 1.17), cos((time * 0.59) * 0.95)) * 0.13;
	p *= 1.83;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.12 * sin((time * 0.59) * 1.88), 0.55 + 0.25 * cos((time * 0.59) * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.84);
	float cc = clamp(0.5 + 0.5 * (v * 2.13), 0.0, 1.0);
	vec3 col = mix(vec3(0.771, 0.732, 0.963), vec3(0.044, 0.069, 0.095), cc);
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.004, 0.974, 1.017);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
