uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.12 * sin(time * 0.87), -0.35 + 0.17 * cos(time * 0.70));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.04);
	vec3 col = vec3(0.5 + 0.5 * v * 1.83) * vec3(0.74, 1.39, 1.46) + vec3(0.09, 0.07, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
