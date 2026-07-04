uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	vec3 col = vec3(0.027, 0.019, 0.050);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.77 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.73 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.77;
		vec2 bq = abs(p - q) - vec2(0.17, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.89 + time * 1.02)) * (0.026 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
