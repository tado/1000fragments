uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec2 z = p;
	vec2 c = vec2(-0.79 + 0.10 * sin(time * 1.49), -0.16 + 0.11 * cos(time * 0.44));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.32);
	vec3 col = vec3(0.5 + 0.5 * v * 2.19) * vec3(0.95, 1.48, 0.78) + vec3(0.03, 0.25, 0.23);
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
