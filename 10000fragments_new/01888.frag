uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	vec3 col = vec3(0.040, 0.053, 0.067);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.00 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 1.27 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.64;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.89 + time * 0.26)) * (0.023 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
