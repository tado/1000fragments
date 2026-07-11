uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	vec2 z = p;
	vec2 c = vec2(-0.77 + 0.18 * sin(time * 1.04), 0.27 + 0.15 * cos(time * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.37);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.13 * 2.08 + time * 0.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
