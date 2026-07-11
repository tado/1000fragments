uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.06 * sin(time * 1.03), -0.59 + 0.18 * cos(time * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.50);
	float cc = clamp(0.5 + 0.5 * v * 1.91, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.31, 0.11), vec3(0.81, 0.68, 0.73), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
