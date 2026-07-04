uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.14 * sin(time * 1.86), -0.06 + 0.08 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.33);
	vec3 col = vec3(0.5 + 0.5 * v * 2.79) * vec3(0.53, 1.14, 0.66) + vec3(0.12, 0.01, 0.15);
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
