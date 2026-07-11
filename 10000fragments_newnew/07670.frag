uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.29 * sin(time * 0.67), -0.07 + 0.25 * cos(time * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.73);
	float cc = clamp(0.5 + 0.5 * v * 3.25, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.02, 0.05), vec3(0.66, 0.72, 0.56), cc);
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
