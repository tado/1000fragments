uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.27 * sin(time * 1.07), -0.25 + 0.10 * cos(time * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.24, -0.44)));
	}
	float v = exp(-trap * 4.39);
	float cc = clamp(0.5 + 0.5 * v * 2.31, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.34, 0.41), vec3(0.75, 0.59, 0.81), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
