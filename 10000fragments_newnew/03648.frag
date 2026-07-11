uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.020, 0.056, 0.039);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.01 * (0.3 + fi * 0.25) + fi * 2.4), cos(time * 1.02 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.75;
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.60 + time * 0.73)) * (0.017 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
