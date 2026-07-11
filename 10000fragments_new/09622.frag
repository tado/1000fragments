uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.003, 0.013, 0.036);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.69 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 1.52 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.73;
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.70 + time * 0.28)) * (0.038 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
