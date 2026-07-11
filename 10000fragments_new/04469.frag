uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.054, 0.027, 0.024);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.96 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 0.47 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.98;
		vec2 bq = abs(p - q) - vec2(0.22, 0.19);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.92 + time * 1.18)) * (0.020 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
