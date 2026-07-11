uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	vec3 col = vec3(0.028, 0.032, 0.037);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.82) * 1.46 * (0.3 + fi * 0.18) + fi * 2.4), cos((time * 0.82) * 0.78 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.65;
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.08, 2.17) + fi * 0.77 + (time * 0.82) * 1.45)) * (0.018 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(1.045, 0.974, 0.932) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
