uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.23 * sin(time * 1.98), 0.10 + 0.15 * cos(time * 1.27));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.51);
	float cc = clamp(0.5 + 0.5 * v * 1.67, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.06, 0.32), vec3(0.99, 0.61, 0.85), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
