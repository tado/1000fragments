uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	vec3 col = vec3(0.057, 0.011, 0.004);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.58 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.80 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.52;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.96 + time * 0.26)) * (0.011 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
