uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec2 z = p;
	vec2 c = vec2(-0.13 + 0.25 * sin(time * 1.13), -0.51 + 0.27 * cos(time * 1.42));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.36, 0.29)));
	}
	float v = exp(-trap * 5.16);
	vec3 col = vec3(0.5 + 0.5 * v * 3.57) * vec3(1.14, 1.08, 1.05) + vec3(0.04, 0.01, 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
