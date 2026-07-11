uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.13 * sin(time * 1.31), 0.58 + 0.10 * cos(time * 1.06));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.20);
	vec3 col = vec3(0.5 + 0.5 * v * 3.24) * vec3(0.82, 1.39, 0.87) + vec3(0.08, 0.12, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
