uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	vec2 z = p;
	vec2 c = vec2(0.04 + 0.19 * sin(time * 1.91), -0.48 + 0.20 * cos(time * 0.98));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.52);
	float cc = clamp(0.5 + 0.5 * v * 3.49, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.26, 0.21), vec3(0.75, 0.96, 0.76), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
