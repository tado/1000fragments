uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	vec2 z = p;
	vec2 c = vec2(-0.31 + 0.08 * sin(time * 1.88), 0.25 + 0.15 * cos(time * 1.44));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.40, 0.42)));
	}
	float v = exp(-trap * 2.37);
	float cc = clamp(0.5 + 0.5 * v * 1.76, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.39, 0.17), vec3(0.74, 0.85, 0.54), cc);
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
