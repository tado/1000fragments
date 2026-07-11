uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	vec3 col = vec3(0.039, 0.046, 0.067);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.66 + time * 1.17), sin(fi * 1.66 + time * 1.17)) * (0.73 + 0.14 * sin(fi * 1.7 + time * 1.71));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.42 + time * 0.75)) * (0.026 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
