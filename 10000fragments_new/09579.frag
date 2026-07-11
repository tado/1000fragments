uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.024, 0.007, 0.057);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.47 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.43 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.89;
		vec2 bq = abs(p - q) - vec2(0.05, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.65 + time * 0.44)) * (0.034 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
