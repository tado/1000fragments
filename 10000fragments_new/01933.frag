uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec2 z = p;
	vec2 c = vec2(0.10 + 0.07 * sin(time * 1.73), -0.22 + 0.29 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.23);
	vec3 col = vec3(0.5 + 0.5 * v * 3.46) * vec3(1.48, 0.69, 0.93) + vec3(0.17, 0.20, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
