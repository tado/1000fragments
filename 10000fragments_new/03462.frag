uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 z = p;
	vec2 c = vec2(-0.77 + 0.09 * sin(time * 1.33), 0.34 + 0.17 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.13);
	float cc = clamp(0.5 + 0.5 * v * 2.68, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.24, 0.40), vec3(0.69, 0.73, 0.77), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
