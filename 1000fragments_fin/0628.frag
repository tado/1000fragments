uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.77;
	p *= 1.27;
	vec2 z = p;
	vec2 c = vec2(0.13 + 0.27 * sin((time * 0.60) * 1.29), 0.33 + 0.12 * cos((time * 0.60) * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.70);
	float cc = clamp(0.5 + 0.5 * (v * 3.58), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.011, 0.101, 0.118), vec3(0.159, 0.606, 0.470), smoothstep(0.0, 0.47, cc)), vec3(0.982, 0.971, 0.897), smoothstep(0.47, 1.0, cc));
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 1.70 + (time * 0.60) * 13.66);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.939, 0.981, 1.058);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
