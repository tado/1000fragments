uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 z = p;
	vec2 c = vec2(-0.46 + 0.28 * sin(time * 1.34), 0.50 + 0.23 * cos(time * 1.58));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.02, -0.37)));
	}
	float v = exp(-trap * 4.49);
	float cc = clamp(0.5 + 0.5 * v * 3.42, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.11, 0.40), vec3(0.69, 0.91, 0.84), cc);
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
