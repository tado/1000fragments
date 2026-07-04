uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.25 * sin(time * 1.62), 0.36 + 0.07 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.33, 0.05)));
	}
	float v = exp(-trap * 4.91);
	float cc = clamp(0.5 + 0.5 * v * 1.63, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.26, 0.54), vec3(0.72, 0.79, 0.47), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
