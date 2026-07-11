uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.31;
	p *= 1.44;
	vec2 z = p;
	vec2 c = vec2(-0.46 + 0.21 * sin((time * 0.66) * 1.30), 0.01 + 0.13 * cos((time * 0.66) * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.30, -0.11)));
	}
	float v = exp(-trap * 5.93);
	float cc = clamp(0.5 + 0.5 * (v * 3.85), 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.37, 0.27), vec3(0.61, 0.59, 0.69), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.992, 1.006) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
