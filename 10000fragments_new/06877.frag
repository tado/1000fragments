uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.08 * sin(time * 1.38), 0.01 + 0.26 * cos(time * 0.95));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.31);
	vec3 col = vec3(0.52, 0.74, 0.68) * (0.24 / (abs(v * 3.62) + 0.04));
	col = col / (1.0 + col);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 1.75 + time * 8.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
