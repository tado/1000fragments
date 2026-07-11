uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.19 * sin((time * 0.55) * 1.29), 0.46 + 0.15 * cos((time * 0.55) * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.44);
	vec3 col = vec3(0.62, 0.57, 0.62) * (0.06 / (abs((v * 1.61)) + 0.05));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 1.000, 0.949) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
