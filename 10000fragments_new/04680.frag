uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.049, 0.019, 0.073);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.96 * (0.3 + fi * 0.21) + fi * 2.4), cos(time * 1.18 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.84;
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.65 + time * 0.32)) * (0.011 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
