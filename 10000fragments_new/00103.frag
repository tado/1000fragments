uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.24 * sin(time * 0.69), 0.42 + 0.11 * cos(time * 0.95));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.16);
	vec3 col = vec3(0.26, 0.25, 0.85) * (0.18 / (abs(v * 1.98) + 0.09));
	col = col / (1.0 + col);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.75 + time * 13.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
