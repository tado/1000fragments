uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	p = rot2(time * -1.28) * p;
	vec3 col = vec3(0.034, 0.028, 0.027);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.11 * (0.3 + fi * 0.16) + fi * 2.4), cos(time * 0.54 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.43;
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.86 + time * 0.75)) * (0.023 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
