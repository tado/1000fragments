uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.15 * sin(time * 0.64), 0.25 + 0.19 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.20);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.75 * 2.86 + time * 0.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
