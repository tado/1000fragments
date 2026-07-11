uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.24 * sin((time * 0.61) * 1.96), 0.35 + 0.14 * cos((time * 0.61) * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.44, 0.37)));
	}
	float v = exp(-trap * 2.83);
	float cc = clamp(0.5 + 0.5 * (v * 3.97), 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.21, 0.16), vec3(0.38, 0.52, 0.60), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.924, 0.982, 1.060) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
