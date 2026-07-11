uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.11 * sin(time * 0.55), -0.21 + 0.28 * cos(time * 1.54));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.02);
	float cc = clamp(0.5 + 0.5 * v * 2.91, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.20, 0.09), vec3(1.00, 0.70, 0.61), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
