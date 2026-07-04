uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.65) * p;
	vec3 col = vec3(0.005, 0.001, 0.009);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.73 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 1.16 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.73;
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.86 + time * 1.00)) * (0.030 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
