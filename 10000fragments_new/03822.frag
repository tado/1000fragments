uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.09 * sin(time * 0.58), 0.07 + 0.07 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.09, 0.10)));
	}
	float v = exp(-trap * 4.21);
	vec3 col = vec3(0.5 + 0.5 * v * 2.98) * vec3(0.64, 0.65, 0.55) + vec3(0.23, 0.19, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
