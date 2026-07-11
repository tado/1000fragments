uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.042, 0.038, 0.018);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.05 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 1.39 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.94;
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.77 + time * 0.24)) * (0.031 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
