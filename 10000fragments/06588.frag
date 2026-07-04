uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	vec3 col = vec3(0.006, 0.010, 0.036);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.31 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.58 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.86;
		vec2 bq = abs(p - q) - vec2(0.12, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.06 + time * 0.67)) * (0.029 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
