uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	vec3 col = vec3(0.023, 0.044, 0.008);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.33 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 0.68 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.44;
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.06 + time * 0.92)) * (0.039 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 2.30 + time * 14.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
