uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 z = p;
	vec2 c = vec2(-0.57 + 0.10 * sin((time * 0.63) * 1.13), -0.56 + 0.07 * cos((time * 0.63) * 1.47));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.88);
	float cc = clamp(0.5 + 0.5 * (v * 2.13), 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.09, 0.14), vec3(0.69, 0.61, 0.68), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 1.007, 1.001) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
