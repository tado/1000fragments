uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.19 * sin(time * 0.77), -0.34 + 0.27 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.64);
	float cc = clamp(0.5 + 0.5 * v * 1.69, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.02, 0.18), vec3(0.91, 0.93, 0.67), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
