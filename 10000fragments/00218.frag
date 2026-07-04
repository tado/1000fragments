uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.21 * sin(time * 1.37), -0.38 + 0.11 * cos(time * 1.38));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.75);
	float cc = clamp(0.5 + 0.5 * v * 2.94, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.04, 0.53), vec3(0.77, 0.94, 0.85), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
