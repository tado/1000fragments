uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec3 col = vec3(0.034, 0.005, 0.031);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.72 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 1.47 * (0.4 + fi * 0.25) + fi * 1.7)) * 0.64;
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.47 + time * 1.09)) * (0.038 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
