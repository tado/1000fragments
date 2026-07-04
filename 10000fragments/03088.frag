uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 z = p;
	vec2 c = vec2(-0.10 + 0.29 * sin(time * 1.92), 0.25 + 0.16 * cos(time * 1.47));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.10, 0.44)));
	}
	float v = exp(-trap * 4.14);
	float cc = clamp(0.5 + 0.5 * v * 2.77, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.08, 0.45), vec3(0.70, 0.62, 0.59), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
