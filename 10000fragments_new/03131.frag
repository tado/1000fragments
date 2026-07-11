uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec2 z = p;
	vec2 c = vec2(-0.17 + 0.07 * sin(time * 1.52), 0.35 + 0.22 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.48, -0.15)));
	}
	float v = exp(-trap * 1.86);
	float cc = clamp(0.5 + 0.5 * v * 2.65, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.11, 0.55), vec3(0.95, 0.84, 0.62), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
