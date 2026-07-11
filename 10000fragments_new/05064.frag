uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	vec3 col = vec3(0.009, 0.006, 0.004);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.88 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 0.49 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.97;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.49 + time * 0.84)) * (0.011 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
