uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec2 z = p;
	vec2 c = vec2(-0.59 + 0.28 * sin((time * 0.79) * 0.88), -0.37 + 0.17 * cos((time * 0.79) * 1.12));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.08);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.95)) * vec3(0.66, 0.68, 0.75) + vec3(0.04, 0.00, 0.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.060, 0.974, 0.911) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
