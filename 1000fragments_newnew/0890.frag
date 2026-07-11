uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.10 * sin((time * 0.54) * 1.01), -0.45 + 0.19 * cos((time * 0.54) * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.29);
	float cc = clamp(0.5 + 0.5 * (v * 3.62), 0.0, 1.0);
	vec3 col = mix(vec3(0.65, 0.78, 0.76), vec3(0.14, 0.16, 0.16), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 0.999, 0.912) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
