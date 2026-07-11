uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	vec2 z = p;
	vec2 c = vec2(0.14 + 0.13 * sin(time * 1.52), -0.17 + 0.11 * cos(time * 0.77));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.20, -0.00)));
	}
	float v = exp(-trap * 5.50);
	vec3 col = vec3(0.84, 1.00, 0.55) * (0.19 / (abs(v * 2.21) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
