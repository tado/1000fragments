uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 z = p;
	vec2 c = vec2(-0.01 + 0.14 * sin(time * 1.00), 0.47 + 0.10 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.27);
	float cc = clamp(0.5 + 0.5 * v * 2.86, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.26, 0.21), vec3(0.97, 0.92, 0.74), cc);
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
