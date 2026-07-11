uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(0.28 + 0.29 * sin(time * 1.47), 0.11 + 0.25 * cos(time * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.27, 0.37)));
	}
	float v = exp(-trap * 5.46);
	vec3 col = vec3(0.73, 0.28, 0.29) * (0.20 / (abs(v * 2.11) + 0.07));
	col = col / (1.0 + col);
	col *= 0.80 + 0.20 * sin(gl_FragCoord.y * 2.56 + time * 10.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
