uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec2 z = p;
	vec2 c = vec2(-0.58 + 0.14 * sin(time * 1.34), 0.34 + 0.18 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.15, 0.45)));
	}
	float v = exp(-trap * 3.45);
	vec3 col = vec3(0.51, 0.28, 0.35) * (0.23 / (abs(v * 1.66) + 0.10));
	col = col / (1.0 + col);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 1.74 + time * 4.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
