uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.049, 0.053, 0.079);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.12 * (0.3 + fi * 0.11) + fi * 2.4), cos(time * 0.93 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.68;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.90 + time * 1.20)) * (0.021 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
