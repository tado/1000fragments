uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec2 z = p;
	vec2 c = vec2(-0.59 + 0.28 * sin(time * 0.63), -0.13 + 0.28 * cos(time * 0.59));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.39, -0.13)));
	}
	float v = exp(-trap * 4.62);
	float cc = clamp(0.5 + 0.5 * v * 1.81, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.04, 0.46), vec3(0.83, 0.83, 0.77), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
