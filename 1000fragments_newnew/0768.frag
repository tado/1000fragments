uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 z = p;
	vec2 c = vec2(-0.03 + 0.26 * sin((time * 0.67) * 0.70), -0.52 + 0.08 * cos((time * 0.67) * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.21);
	vec3 col = vec3(0.83, 0.74, 0.77) * (0.08 / (abs((v * 3.68)) + 0.05));
	col = col / (1.0 + col);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 2.13 + (time * 0.67) * 12.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.957, 1.024) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
