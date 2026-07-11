uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(0.09 + 0.15 * sin(time * 0.95), 0.10 + 0.23 * cos(time * 0.98));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.43, -0.37)));
	}
	float v = exp(-trap * 1.69);
	float cc = clamp(0.5 + 0.5 * v * 2.18, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.05, 0.25), vec3(0.95, 0.58, 0.95), cc);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
