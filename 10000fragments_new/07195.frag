uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	vec3 col = vec3(0.042, 0.053, 0.078);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.67 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.59 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.55;
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.77 + time * 1.42)) * (0.012 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
