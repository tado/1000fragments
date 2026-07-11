uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.06 * sin(time * 1.02), 0.34 + 0.13 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.05);
	vec3 col = vec3(0.80, 0.81, 0.27) * (0.05 / (abs(v * 3.86) + 0.02));
	col = col / (1.0 + col);
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 1.15 + time * 12.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
