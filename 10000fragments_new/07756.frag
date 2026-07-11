uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.021, 0.068);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.30 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 0.68 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.79;
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 1.12)) * (0.026 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
