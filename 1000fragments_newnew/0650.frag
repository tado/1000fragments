uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.22 * sin((time * 0.76) * 1.63), -0.33 + 0.16 * cos((time * 0.76) * 0.68));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.55);
	float cc = clamp(0.5 + 0.5 * (v * 1.93), 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.34, 0.22), vec3(0.49, 0.48, 0.61), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.945, 0.972, 1.048) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
