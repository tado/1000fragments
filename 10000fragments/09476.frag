uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec3 col = vec3(0.057, 0.006, 0.034);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.66 * (0.3 + fi * 0.16) + fi * 2.4), cos(time * 1.23 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.69;
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.48 + time * 0.87)) * (0.018 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
