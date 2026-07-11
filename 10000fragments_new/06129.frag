uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.18 * sin(time * 0.77), -0.32 + 0.07 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.90);
	vec3 col = vec3(0.19, 0.79, 0.99) * (0.24 / (abs(v * 1.80) + 0.02));
	col = col / (1.0 + col);
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
