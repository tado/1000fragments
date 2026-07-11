uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.27 * sin(time * 1.17), -0.19 + 0.13 * cos(time * 1.09));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.84);
	float cc = clamp(0.5 + 0.5 * v * 3.10, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.24, 0.42), vec3(0.85, 0.62, 0.74), cc);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
