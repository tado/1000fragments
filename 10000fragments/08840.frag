uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 z = p;
	vec2 c = vec2(0.17 + 0.06 * sin(time * 1.63), -0.08 + 0.12 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.85);
	vec3 col = vec3(0.70, 0.89, 0.57) * (0.06 / (abs(v * 1.56) + 0.07));
	col = col / (1.0 + col);
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 1.29 + time * 4.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
