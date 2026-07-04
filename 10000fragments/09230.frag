uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	vec3 col = vec3(0.044, 0.028, 0.016);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.75 * (0.3 + fi * 0.13) + fi * 2.4), cos(time * 0.77 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.62;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.62 + time * 1.39)) * (0.026 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
