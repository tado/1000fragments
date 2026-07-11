uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.24 * sin((time * 0.71) * 0.56), -0.28 + 0.09 * cos((time * 0.71) * 0.83));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.98);
	float cc = clamp(0.5 + 0.5 * (v * 2.60), 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.22, 0.25), vec3(0.56, 0.79, 0.58), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.970, 1.012) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
