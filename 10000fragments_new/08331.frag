uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.059, 0.013, 0.064);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.11 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 1.18 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.70;
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.79 + time * 1.26)) * (0.015 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 1.55 + time * 7.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
