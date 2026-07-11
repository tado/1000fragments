uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.13 * sin(time * 1.62), -0.18 + 0.20 * cos(time * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.11);
	float cc = clamp(0.5 + 0.5 * v * 1.51, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.18, 0.27), vec3(0.87, 0.65, 0.70), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
