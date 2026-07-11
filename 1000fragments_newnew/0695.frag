uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2((time * 0.78) * 1.40) * p;
	vec3 col = vec3(0.001, 0.036, 0.011);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.78) * 0.81 * (0.3 + fi * 0.06) + fi * 2.4), cos((time * 0.78) * 1.37 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.56;
		float gd = abs(length(p - q) - 0.21);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.41, 0.82) + fi * 1.23 + (time * 0.78) * 0.77)) * (0.034 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.005, 1.014) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
