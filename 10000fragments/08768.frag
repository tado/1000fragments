uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.034, 0.034, 0.037);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.85 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 1.58 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.42;
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.41 + time * 1.34)) * (0.032 / (gd + 0.022));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 1.73 + time * 12.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
