uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 z = p;
	vec2 c = vec2(-0.04 + 0.16 * sin(time * 0.95), 0.46 + 0.11 * cos(time * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.93);
	vec3 col = vec3(0.40, 0.84, 0.78) * (0.19 / (abs(v * 2.90) + 0.10));
	col = col / (1.0 + col);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.64 + time * 10.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
