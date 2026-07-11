uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.029, 0.021, 0.033);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.15 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 1.29 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.62;
		vec2 bq = abs(p - q) - vec2(0.17, 0.23);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.84 + time * 0.80)) * (0.037 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
