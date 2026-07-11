uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.19 * sin(time * 0.51), -0.47 + 0.28 * cos(time * 0.52));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.47);
	float cc = clamp(0.5 + 0.5 * v * 3.70, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.35, 0.55), vec3(0.96, 0.59, 0.55), cc);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
