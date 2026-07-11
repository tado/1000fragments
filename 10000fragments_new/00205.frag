uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec2 z = p;
	vec2 c = vec2(-0.26 + 0.10 * sin(time * 0.71), 0.47 + 0.26 * cos(time * 1.33));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.10);
	vec3 col = vec3(0.5 + 0.5 * v * 3.64) * vec3(0.88, 0.69, 1.44) + vec3(0.11, 0.04, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
