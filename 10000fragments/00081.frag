uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	vec3 col = vec3(0.007, 0.042, 0.046);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.09 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 1.45 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.95;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.83 + time * 0.46)) * (0.036 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
