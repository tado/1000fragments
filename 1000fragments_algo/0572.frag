uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 1.84;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.13 * sin((time * 0.70) * 1.59), -0.27 + 0.29 * cos((time * 0.70) * 0.86));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.48);
	float cc = clamp(0.5 + 0.5 * (v * 2.27), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.08, 0.04), vec3(0.62, 0.61, 0.53), cc);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.002, 1.018) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
