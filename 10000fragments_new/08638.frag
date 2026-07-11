uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.036, 0.054);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.81 + time * 2.29), sin(fi * 1.81 + time * 2.29)) * (0.45 + 0.28 * sin(fi * 1.7 + time * 1.68));
		vec2 bq = abs(p - q) - vec2(0.08, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.98 + time * 1.31)) * (0.034 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.91 + time * 14.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
