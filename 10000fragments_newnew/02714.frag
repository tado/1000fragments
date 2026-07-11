uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.08 * sin(time * 1.07), -0.32 + 0.19 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.65);
	vec3 col = vec3(0.69, 0.98, 0.35) * (0.25 / (abs(v * 2.13) + 0.04));
	col = col / (1.0 + col);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.66 + time * 10.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
