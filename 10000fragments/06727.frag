uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	vec3 col = vec3(0.005, 0.054, 0.069);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.69 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.89 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.81;
		vec2 bq = abs(p - q) - vec2(0.15, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.57 + time * 1.37)) * (0.019 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
