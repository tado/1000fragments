uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec2 z = p;
	vec2 c = vec2(-0.38 + 0.21 * sin(time * 1.60), -0.23 + 0.16 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.23, -0.15)));
	}
	float v = exp(-trap * 3.43);
	float cc = clamp(0.5 + 0.5 * v * 1.56, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.17, 0.51), vec3(0.83, 0.73, 0.78), cc);
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
