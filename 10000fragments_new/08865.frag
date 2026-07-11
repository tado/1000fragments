uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.08 * sin(time * 1.07), -0.25 + 0.12 * cos(time * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.10);
	float cc = clamp(0.5 + 0.5 * v * 3.48, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.03, 0.08), vec3(0.60, 0.61, 0.96), cc);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.54 + time * 17.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
