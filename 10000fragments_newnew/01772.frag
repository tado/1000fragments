uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	vec2 z = p;
	vec2 c = vec2(0.15 + 0.27 * sin(time * 1.39), 0.04 + 0.18 * cos(time * 1.26));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.21);
	vec3 col = vec3(0.5 + 0.5 * v * 2.15) * vec3(0.82, 0.68, 1.50) + vec3(0.10, 0.14, 0.01);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 1.18 + time * 17.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
