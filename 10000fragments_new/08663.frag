uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.26 * sin(time * 1.96), -0.20 + 0.09 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.53);
	vec3 col = vec3(0.87, 0.67, 0.29) * (0.25 / (abs(v * 1.78) + 0.04));
	col = col / (1.0 + col);
	col *= 0.85 + 0.19 * sin(gl_FragCoord.y * 1.13 + time * 16.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
