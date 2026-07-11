uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.12 * sin((time * 0.65) * 1.31), -0.52 + 0.25 * cos((time * 0.65) * 1.33));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.57);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.38)) * vec3(0.77, 0.65, 0.65) + vec3(0.09, 0.10, 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.08));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 1.003, 0.910) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
