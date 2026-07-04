uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	vec3 col = vec3(0.018, 0.011, 0.007);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.41 + time * 1.72), sin(fi * 2.41 + time * 1.72)) * (0.78 + 0.18 * sin(fi * 1.7 + time * 1.65));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.62 + time * 0.89)) * (0.024 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
