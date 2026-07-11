uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	vec3 col = vec3(0.056, 0.001, 0.051);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.54 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 0.64 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.43;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.58 + time * 1.30)) * (0.014 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
