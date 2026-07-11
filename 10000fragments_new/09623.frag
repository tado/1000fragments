uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec3 col = vec3(0.048, 0.016, 0.037);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.94 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 0.97 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.85;
		vec2 bq = abs(p - q) - vec2(0.23, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.45 + time * 1.14)) * (0.015 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
