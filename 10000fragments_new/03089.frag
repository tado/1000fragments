uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	vec3 col = vec3(0.037, 0.042, 0.007);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.38 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.54 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.98;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.62 + time * 1.09)) * (0.035 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 2.63 + time * 15.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
