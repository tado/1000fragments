uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.054, 0.042, 0.076);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.57 * (0.3 + fi * 0.13) + fi * 2.4), cos(time * 0.78 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.47;
		vec2 bq = abs(p - q) - vec2(0.12, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.58 + time * 0.84)) * (0.031 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
