uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.26 * sin(time * 0.84), -0.40 + 0.10 * cos(time * 0.75));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.00);
	float cc = clamp(0.5 + 0.5 * v * 3.20, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.04, 0.37), vec3(0.61, 0.75, 0.59), cc);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
