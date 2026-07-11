uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	vec3 col = vec3(0.024, 0.055, 0.030);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.83 * (0.3 + fi * 0.05) + fi * 2.4), cos(time * 0.45 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.77;
		vec2 bq = abs(p - q) - vec2(0.15, 0.06);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.41 + time * 0.42)) * (0.030 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
