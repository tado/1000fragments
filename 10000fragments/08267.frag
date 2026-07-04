uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec3 col = vec3(0.002, 0.026, 0.069);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.60 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.71 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.78;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.08 + time * 0.91)) * (0.010 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
