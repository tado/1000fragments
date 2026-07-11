uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 z = p;
	vec2 c = vec2(0.07 + 0.18 * sin(time * 1.61), -0.24 + 0.29 * cos(time * 0.59));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.61);
	vec3 col = vec3(0.5 + 0.5 * v * 3.70) * vec3(0.64, 1.13, 0.56) + vec3(0.12, 0.03, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
