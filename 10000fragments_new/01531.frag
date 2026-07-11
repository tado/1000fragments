uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.059, 0.052, 0.079);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.60 + time * 1.56), sin(fi * 1.60 + time * 1.56)) * (0.69 + 0.36 * sin(fi * 1.7 + time * 1.75));
		float gd = abs(length(p - q) - 0.11);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.65 + time * 1.31)) * (0.031 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.78 + time * 7.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
