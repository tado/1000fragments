uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.22 * sin(time * 1.18), 0.30 + 0.18 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.28, 0.48)));
	}
	float v = exp(-trap * 5.55);
	vec3 col = vec3(0.5 + 0.5 * v * 2.61) * vec3(0.62, 1.40, 1.09) + vec3(0.14, 0.10, 0.19);
	col *= 0.86 + 0.16 * sin(gl_FragCoord.y * 2.96 + time * 8.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
