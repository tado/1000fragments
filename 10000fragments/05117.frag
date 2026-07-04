uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	vec3 col = vec3(0.018, 0.007, 0.059);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.43 * (0.3 + fi * 0.13) + fi * 2.4), cos(time * 1.19 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.48;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.95 + time * 0.30)) * (0.021 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
