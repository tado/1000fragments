uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.06 * sin(time * 0.60), 0.43 + 0.21 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.09, -0.46)));
	}
	float v = exp(-trap * 2.25);
	float cc = clamp(0.5 + 0.5 * v * 1.61, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.14, 0.51), vec3(0.79, 0.65, 0.55), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
