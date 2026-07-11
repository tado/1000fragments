uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.23 * sin(time * 1.03), -0.10 + 0.09 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.57);
	vec3 col = vec3(0.5 + 0.5 * v * 2.38) * vec3(1.47, 1.29, 0.56) + vec3(0.20, 0.13, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
