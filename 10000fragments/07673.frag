uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.052, 0.046);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.82 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.37 * (0.4 + fi * 0.25) + fi * 1.7)) * 0.79;
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.46 + time * 0.52)) * (0.025 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
