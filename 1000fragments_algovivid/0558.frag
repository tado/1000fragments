uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.17 * sin((time * 0.51) * 1.44), 0.52 + 0.11 * cos((time * 0.51) * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.24, 0.11)));
	}
	float v = exp(-trap * 4.03);
	vec3 col = vec3(0.65, 0.62, 0.51) * (0.10 / (abs((v * 3.56)) + 0.08));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.42 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.979, 1.026, 0.952) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
