uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.25 * sin(time * 0.78), -0.00 + 0.18 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.86);
	float cc = clamp(0.5 + 0.5 * v * 2.71, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.14, 0.31), vec3(0.71, 0.97, 0.72), cc);
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
