uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	vec3 col = vec3(0.001, 0.007, 0.025);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.03 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 0.98 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.60;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.88 + time * 0.40)) * (0.032 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
