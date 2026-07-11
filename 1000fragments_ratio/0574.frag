uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.26 * sin((time * 0.80) * 1.98), 0.31 + 0.08 * cos((time * 0.80) * 1.23));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.37);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.83)) * vec3(0.54, 0.58, 0.55) + vec3(0.10, 0.10, 0.08);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.966, 1.012) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
