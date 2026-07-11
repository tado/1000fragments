uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.10 * sin(time * 1.25), 0.25 + 0.11 * cos(time * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.22, 0.33)));
	}
	float v = exp(-trap * 4.23);
	float cc = clamp(0.5 + 0.5 * v * 2.59, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.27, 0.23), vec3(0.73, 0.74, 0.76), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
