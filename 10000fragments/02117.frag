uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.034, 0.002, 0.003);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.53 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.23 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.92;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.87 + time * 0.60)) * (0.029 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
