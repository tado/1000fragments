uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.13 * sin((time * 0.78) * 0.92), -0.06 + 0.29 * cos((time * 0.78) * 1.05));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.12);
	float cc = clamp(0.5 + 0.5 * (v * 3.45), 0.0, 1.0);
	vec3 col = mix(vec3(0.70, 0.71, 0.69), vec3(0.11, 0.11, 0.09), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 0.970, 1.024) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
