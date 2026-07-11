uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 z = p;
	vec2 c = vec2(0.14 + 0.19 * sin(time * 1.14), 0.55 + 0.11 * cos(time * 1.04));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.27, -0.02)));
	}
	float v = exp(-trap * 1.59);
	float cc = clamp(0.5 + 0.5 * v * 3.45, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.25, 0.36), vec3(0.69, 0.72, 0.79), cc);
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
