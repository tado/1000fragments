uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.14 * sin((time * 0.63) * 1.11), 0.21 + 0.19 * cos((time * 0.63) * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.31);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.17)) * vec3(0.62, 0.63, 0.58) + vec3(0.01, 0.03, 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.968, 1.021) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
