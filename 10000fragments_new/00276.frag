uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.10 * sin(time * 1.93), 0.14 + 0.14 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.76);
	vec3 col = vec3(0.5 + 0.5 * v * 2.11) * vec3(0.95, 0.80, 0.97) + vec3(0.03, 0.12, 0.16);
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
