uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	vec3 col = vec3(0.026, 0.015, 0.018);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.89 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.78 * (0.4 + fi * 0.09) + fi * 1.7)) * 0.63;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.03 + time * 0.29)) * (0.025 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
