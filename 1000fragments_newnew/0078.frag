uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec2 z = p;
	vec2 c = vec2(-0.02 + 0.13 * sin((time * 0.67) * 0.83), -0.32 + 0.09 * cos((time * 0.67) * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.13, 0.19)));
	}
	float v = exp(-trap * 2.49);
	float cc = clamp(0.5 + 0.5 * (v * 3.30), 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.43, 0.30), vec3(0.63, 0.78, 0.59), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.016, 0.935) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
