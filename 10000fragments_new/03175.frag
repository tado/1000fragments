uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 z = p;
	vec2 c = vec2(-0.10 + 0.10 * sin(time * 1.05), 0.35 + 0.05 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.96);
	float cc = clamp(0.5 + 0.5 * v * 3.17, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.23, 0.10), vec3(0.71, 0.62, 0.84), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
