uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.74;
	vec3 col = vec3(0.033, 0.052, 0.002);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.52 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 1.16 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.56;
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.44 + time * 0.33)) * (0.015 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
