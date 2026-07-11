uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.002, 0.004, 0.066);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.23 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.81 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.54;
		vec2 bq = abs(p - q) - vec2(0.21, 0.07);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.83 + time * 0.77)) * (0.026 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
