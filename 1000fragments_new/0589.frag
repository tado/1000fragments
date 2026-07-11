uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	vec3 col = vec3(0.015, 0.011, 0.027);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.88 + time * 0.59), sin(fi * 1.88 + time * 0.59)) * (0.49 + 0.14 * sin(fi * 1.7 + time * 1.47));
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.61 + time * 1.24)) * (0.027 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 1.28 + time * 6.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
