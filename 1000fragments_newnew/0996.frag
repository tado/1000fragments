uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec2 z = p;
	vec2 c = vec2(-0.01 + 0.20 * sin((time * 0.55) * 1.38), -0.53 + 0.14 * cos((time * 0.55) * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.28, 0.01)));
	}
	float v = exp(-trap * 4.27);
	float cc = clamp(0.5 + 0.5 * (v * 2.02), 0.0, 1.0);
	vec3 col = mix(vec3(0.42, 0.40, 0.35), vec3(0.61, 0.68, 0.75), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.948, 1.026) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
