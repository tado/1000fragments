uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 z = p;
	vec2 c = vec2(0.06 + 0.10 * sin(time * 1.50), -0.27 + 0.05 * cos(time * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.06, -0.36)));
	}
	float v = exp(-trap * 3.49);
	float cc = clamp(0.5 + 0.5 * v * 2.22, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.13, 0.52), vec3(0.80, 0.98, 0.56), cc);
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
