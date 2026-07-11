uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.11 * sin((time * 0.55) * 1.99), -0.45 + 0.22 * cos((time * 0.55) * 1.28));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.27, -0.37)));
	}
	float v = exp(-trap * 1.61);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.68)) * vec3(0.64, 0.61, 0.61) + vec3(0.01, 0.01, 0.00);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 0.975, 0.993) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
