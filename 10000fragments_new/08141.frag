uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.041, 0.050, 0.036);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.70 + time * 0.66), sin(fi * 0.70 + time * 0.66)) * (0.50 + 0.24 * sin(fi * 1.7 + time * 1.38));
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.19 + time * 0.95)) * (0.018 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
