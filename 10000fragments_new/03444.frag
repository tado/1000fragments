uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.14 * sin(time * 1.22), 0.38 + 0.18 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.64);
	float cc = clamp(0.5 + 0.5 * v * 2.43, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.03, 0.08), vec3(0.79, 0.75, 0.42), cc);
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
