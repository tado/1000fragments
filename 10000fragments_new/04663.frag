uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.039, 0.006, 0.045);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.99 + time * 0.69), sin(fi * 1.99 + time * 0.69)) * (0.77 + 0.34 * sin(fi * 1.7 + time * 0.67));
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.98 + time * 0.94)) * (0.023 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 2.92 + time * 4.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
