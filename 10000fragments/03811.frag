uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(-0.86 + 0.25 * sin(time * 1.92), -0.52 + 0.22 * cos(time * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.10, -0.24)));
	}
	float v = exp(-trap * 2.05);
	vec3 col = vec3(0.5 + 0.5 * v * 2.87) * vec3(0.88, 1.10, 1.28) + vec3(0.21, 0.11, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
