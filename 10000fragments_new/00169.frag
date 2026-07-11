uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.19 * sin(time * 1.80), 0.55 + 0.14 * cos(time * 1.05));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.42, 0.31)));
	}
	float v = exp(-trap * 2.16);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.32 * 1.62 + time * 0.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
