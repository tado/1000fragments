uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.13 * sin(time * 0.51), -0.36 + 0.11 * cos(time * 0.50));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.99);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.01 * 1.75 + time * 0.13);
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
