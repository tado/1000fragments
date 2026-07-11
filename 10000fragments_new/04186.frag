uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.09 * sin(time * 0.58), 0.44 + 0.17 * cos(time * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.46);
	float cc = clamp(0.5 + 0.5 * v * 2.82, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.17, 0.12), vec3(0.85, 0.80, 0.71), cc);
	col = mod(col * 2.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
