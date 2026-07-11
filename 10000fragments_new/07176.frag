uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 z = p;
	vec2 c = vec2(-0.68 + 0.13 * sin(time * 1.11), 0.41 + 0.24 * cos(time * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.34);
	vec3 col = vec3(0.37, 0.47, 0.78) * (0.23 / (abs(v * 3.02) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 2.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
