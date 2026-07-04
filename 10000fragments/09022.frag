uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	vec3 col = vec3(0.059, 0.048, 0.033);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.52 * (0.3 + fi * 0.05) + fi * 2.4), cos(time * 0.40 * (0.4 + fi * 0.09) + fi * 1.7)) * 0.88;
		vec2 bq = abs(p - q) - vec2(0.25, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.48 + time * 1.49)) * (0.015 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.36 + time * 12.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
