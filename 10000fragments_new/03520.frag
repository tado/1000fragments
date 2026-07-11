uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.05 * sin(time * 1.28), -0.19 + 0.26 * cos(time * 1.05));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.29, 0.42)));
	}
	float v = exp(-trap * 3.47);
	vec3 col = vec3(0.19, 0.36, 0.66) * (0.08 / (abs(v * 2.90) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
