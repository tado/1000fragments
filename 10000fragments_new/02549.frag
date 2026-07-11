uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	vec2 z = p;
	vec2 c = vec2(0.03 + 0.10 * sin(time * 1.04), 0.01 + 0.24 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.07, -0.17)));
	}
	float v = exp(-trap * 4.14);
	vec3 col = vec3(0.5 + 0.5 * v * 2.10) * vec3(0.99, 1.45, 0.92) + vec3(0.05, 0.04, 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
