uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	vec2 z = p;
	vec2 c = vec2(-0.86 + 0.23 * sin((time * 0.61) * 1.60), -0.58 + 0.07 * cos((time * 0.61) * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.82);
	float cc = clamp(0.5 + 0.5 * (v * 3.45), 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.41, 0.28), vec3(0.49, 0.59, 0.60), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.976, 1.028) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
