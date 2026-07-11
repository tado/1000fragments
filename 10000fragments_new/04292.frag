uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.023, 0.043, 0.055);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.28 + time * 2.14), sin(fi * 1.28 + time * 2.14)) * (0.35 + 0.11 * sin(fi * 1.7 + time * 0.73));
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.27 + time * 0.32)) * (0.033 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
