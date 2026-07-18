uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.59;
	p *= 1.71;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.20 * sin((time * 0.72) * 1.06), -0.25 + 0.12 * cos((time * 0.72) * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.15);
	float cc = clamp(0.5 + 0.5 * (v * 2.14), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.089, 0.084, 0.064), vec3(0.684, 0.324, 0.153), smoothstep(0.0, 0.46, cc)), vec3(1.000, 0.836, 0.627), smoothstep(0.46, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.031, 1.004, 0.917);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
