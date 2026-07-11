uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 z = p;
	vec2 c = vec2(-0.36 + 0.15 * sin(time * 0.78), -0.25 + 0.16 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.17);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.86 * 1.50 + time * 0.29);
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
