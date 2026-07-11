uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec2 z = p;
	vec2 c = vec2(0.17 + 0.27 * sin(time * 0.61), 0.10 + 0.13 * cos(time * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.08, 0.49)));
	}
	float v = exp(-trap * 1.78);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.00 * 2.71 + time * 0.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
