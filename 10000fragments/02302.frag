uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec2 z = p;
	vec2 c = vec2(-0.04 + 0.05 * sin(time * 1.69), -0.25 + 0.14 * cos(time * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.22);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.21 * 2.45 + time * 0.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
