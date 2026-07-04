uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	vec3 col = vec3(0.042, 0.003, 0.007);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.61 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 0.66 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.56;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.89 + time * 0.92)) * (0.017 / (gd + 0.022));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
