uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.08 * sin(time * 1.16), 0.52 + 0.08 * cos(time * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.40, 0.36)));
	}
	float v = exp(-trap * 2.23);
	vec3 col = vec3(0.20, 0.39, 0.40) * (0.16 / (abs(v * 3.14) + 0.03));
	col = col / (1.0 + col);
	col = fract(col * 2.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
