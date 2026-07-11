uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 z = p;
	vec2 c = vec2(-0.04 + 0.07 * sin((time * 0.54) * 1.24), 0.13 + 0.29 * cos((time * 0.54) * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.51);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.07)) * vec3(0.45, 0.57, 0.54) + vec3(0.04, 0.04, 0.06);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 2.57 + (time * 0.54) * 13.64);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.977, 1.002) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
