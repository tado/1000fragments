uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	vec3 col = vec3(0.047, 0.014, 0.004);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.52 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 1.11 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.98;
		vec2 bq = abs(p - q) - vec2(0.08, 0.16);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.87 + time * 1.42)) * (0.034 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
