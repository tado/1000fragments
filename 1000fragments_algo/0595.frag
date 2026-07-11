uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p *= 1.38;
	vec2 z = p;
	vec2 c = vec2(-0.79 + 0.05 * sin((time * 0.52) * 1.68), -0.05 + 0.28 * cos((time * 0.52) * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.79);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.45)) * vec3(0.57, 0.61, 0.61) + vec3(0.05, 0.03, 0.02);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.951, 1.008) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
