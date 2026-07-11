uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 z = p;
	vec2 c = vec2(0.26 + 0.29 * sin(time * 1.85), -0.13 + 0.17 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.02);
	float cc = clamp(0.5 + 0.5 * v * 2.93, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.11, 0.03), vec3(0.64, 0.96, 0.54), cc);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
