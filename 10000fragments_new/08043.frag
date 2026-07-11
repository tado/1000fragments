uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.13 * sin(time * 1.51), 0.59 + 0.15 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.47);
	vec3 col = vec3(0.5 + 0.5 * v * 1.87) * vec3(1.10, 0.57, 1.11) + vec3(0.16, 0.20, 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
