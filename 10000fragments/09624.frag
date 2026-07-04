uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.045, 0.023, 0.033);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.44 * (0.3 + fi * 0.21) + fi * 2.4), cos(time * 0.71 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.98;
		float gd = abs(length(p - q) - 0.08);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.21 + time * 0.63)) * (0.015 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
