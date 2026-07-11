uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	vec2 z = p;
	vec2 c = vec2(0.28 + 0.20 * sin((time * 0.53) * 1.25), 0.56 + 0.16 * cos((time * 0.53) * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.83);
	float cc = clamp(0.5 + 0.5 * (v * 3.62), 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.14, 0.10), vec3(0.62, 0.58, 0.62), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.979, 1.009) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
