uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.07 * sin(time * 1.87), 0.25 + 0.07 * cos(time * 0.93));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.92);
	vec3 col = vec3(0.5 + 0.5 * v * 1.69) * vec3(1.08, 1.11, 0.54) + vec3(0.09, 0.11, 0.23);
	col = mod(col * 2.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
