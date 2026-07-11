uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	vec2 z = p;
	vec2 c = vec2(-0.90 + 0.17 * sin(time * 1.67), -0.53 + 0.22 * cos(time * 0.52));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.07);
	vec3 col = vec3(0.5 + 0.5 * v * 2.22) * vec3(1.50, 0.74, 1.05) + vec3(0.23, 0.11, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
