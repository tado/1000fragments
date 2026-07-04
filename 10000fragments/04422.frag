uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.79) * p;
	vec3 col = vec3(0.025, 0.037, 0.037);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.36 + time * 2.41), sin(fi * 1.36 + time * 2.41)) * (0.33 + 0.25 * sin(fi * 1.7 + time * 1.38));
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.75 + time * 0.33)) * (0.022 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
