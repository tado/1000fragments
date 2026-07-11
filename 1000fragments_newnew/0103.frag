uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.06 * sin((time * 0.73) * 1.18), 0.47 + 0.17 * cos((time * 0.73) * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.98);
	float cc = clamp(0.5 + 0.5 * (v * 3.49), 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.35, 0.33), vec3(0.59, 0.63, 0.64), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.982, 1.018) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
