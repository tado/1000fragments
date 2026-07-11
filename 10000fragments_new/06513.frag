uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	vec3 col = vec3(0.015, 0.017, 0.007);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.15 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 1.28 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.42;
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.22 + time * 0.33)) * (0.009 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
