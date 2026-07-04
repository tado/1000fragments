uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.034, 0.044, 0.017);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.56 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 1.00 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.59;
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.26 + time * 0.29)) * (0.022 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
