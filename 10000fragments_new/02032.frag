uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.33) * p;
	vec3 col = vec3(0.051, 0.017, 0.003);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.80 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 1.22 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.80;
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.48 + time * 0.24)) * (0.017 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
