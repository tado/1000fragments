uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.13 * sin(time * 1.13), -0.46 + 0.23 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.46, -0.11)));
	}
	float v = exp(-trap * 2.38);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.30 * 3.29 + time * 0.52);
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 2.69 + time * 12.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
