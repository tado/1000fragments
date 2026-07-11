uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.07 * sin((time * 0.74) * 0.50), 0.51 + 0.11 * cos((time * 0.74) * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.19);
	float cc = clamp(0.5 + 0.5 * (v * 2.14), 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.13, 0.04), vec3(0.77, 0.71, 0.87), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.966, 1.027) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
