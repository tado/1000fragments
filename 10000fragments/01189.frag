uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.051, 0.013, 0.050);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.55 * (0.3 + fi * 0.21) + fi * 2.4), cos(time * 1.20 * (0.4 + fi * 0.09) + fi * 1.7)) * 0.45;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.93 + time * 1.05)) * (0.010 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.19, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
