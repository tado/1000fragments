uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 z = p;
	vec2 c = vec2(-0.80 + 0.06 * sin(time * 0.77), 0.19 + 0.29 * cos(time * 0.70));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.71);
	vec3 col = vec3(0.5 + 0.5 * v * 2.58) * vec3(0.56, 0.90, 1.32) + vec3(0.15, 0.20, 0.22);
	col = fract(col * 1.93);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
