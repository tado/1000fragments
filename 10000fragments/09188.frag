uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	vec2 z = p;
	vec2 c = vec2(0.06 + 0.26 * sin(time * 0.85), 0.46 + 0.25 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.33);
	float cc = clamp(0.5 + 0.5 * v * 3.30, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.24, 0.16), vec3(0.73, 1.00, 0.49), cc);
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
