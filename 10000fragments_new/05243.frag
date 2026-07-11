uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.034, 0.033, 0.065);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.76 + time * 2.16), sin(fi * 0.76 + time * 2.16)) * (0.75 + 0.27 * sin(fi * 1.7 + time * 1.31));
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.03 + time * 0.99)) * (0.015 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
