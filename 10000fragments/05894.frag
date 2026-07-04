uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.98;
	vec3 col = vec3(0.015, 0.005, 0.077);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.31 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 1.07 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.78;
		vec2 bq = abs(p - q) - vec2(0.09, 0.23);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.95 + time * 0.20)) * (0.037 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
