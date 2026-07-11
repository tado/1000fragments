uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	vec2 z = p;
	vec2 c = vec2(0.06 + 0.15 * sin(time * 1.45), -0.57 + 0.12 * cos(time * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.17);
	float cc = clamp(0.5 + 0.5 * v * 3.46, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.13, 0.37), vec3(0.79, 0.64, 0.53), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
