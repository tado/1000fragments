uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.25 * sin(time * 0.85), -0.02 + 0.28 * cos(time * 1.09));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.03);
	float cc = clamp(0.5 + 0.5 * v * 3.54, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.03, 0.39), vec3(0.91, 0.64, 0.72), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
