uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	vec3 col = vec3(0.034, 0.034, 0.048);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.24 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 0.44 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.55;
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.57 + time * 0.83)) * (0.038 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.05 + time * 11.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
