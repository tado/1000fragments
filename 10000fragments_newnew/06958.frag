uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.88;
	vec3 col = vec3(0.032, 0.010, 0.016);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.93 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 1.37 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.70;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.81 + time * 1.09)) * (0.036 / (gd + 0.010));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
