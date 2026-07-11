uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.23 * sin((time * 0.68) * 1.02), -0.50 + 0.21 * cos((time * 0.68) * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.75);
	float cc = clamp(0.5 + 0.5 * (v * 3.18), 0.0, 1.0);
	vec3 col = mix(vec3(0.51, 0.54, 0.63), vec3(0.03, 0.08, 0.12), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.976, 1.042) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
