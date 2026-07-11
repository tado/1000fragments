uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.25 * sin(time * 0.86), 0.02 + 0.12 * cos(time * 1.32));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.50);
	vec3 col = vec3(0.77, 0.61, 0.34) * (0.08 / (abs(v * 1.77) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
