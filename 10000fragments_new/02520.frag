uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 z = p;
	vec2 c = vec2(-0.89 + 0.07 * sin(time * 0.59), 0.56 + 0.19 * cos(time * 1.54));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.67);
	float cc = clamp(0.5 + 0.5 * v * 3.29, 0.0, 1.0);
	vec3 col = mix(vec3(0.38, 0.14, 0.05), vec3(0.83, 0.71, 0.57), cc);
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
