uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec3 col = vec3(0.049, 0.014, 0.034);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.26 * (0.3 + fi * 0.16) + fi * 2.4), cos(time * 0.98 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.61;
		vec2 bq = abs(p - q) - vec2(0.14, 0.19);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.31 + time * 1.41)) * (0.026 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
