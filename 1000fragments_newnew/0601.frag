uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.30 * sin((time * 0.59) * 1.96), -0.30 + 0.18 * cos((time * 0.59) * 1.45));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.76);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.30)) * vec3(0.59, 0.59, 0.52) + vec3(0.05, 0.04, 0.07);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.03 + (time * 0.59) * 17.58);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.970, 1.017, 0.942) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
