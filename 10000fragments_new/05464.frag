uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.05 * sin(time * 0.50), 0.36 + 0.25 * cos(time * 1.02));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.99);
	float cc = clamp(0.5 + 0.5 * v * 2.02, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.40, 0.17), vec3(0.79, 0.87, 0.66), cc);
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
