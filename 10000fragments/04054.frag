uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.026, 0.013, 0.029);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.63 + time * 2.16), sin(fi * 0.63 + time * 2.16)) * (0.78 + 0.40 * sin(fi * 1.7 + time * 1.08));
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.13 + time * 0.76)) * (0.017 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 2.50 + time * 11.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
