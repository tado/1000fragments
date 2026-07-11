uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	p = rot2((time * 0.52) * -0.54) * p;
	vec3 col = vec3(0.034, 0.009, 0.010);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.52) * 1.35 * (0.3 + fi * 0.17) + fi * 2.4), cos((time * 0.52) * 1.10 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.82;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.83, 1.67) + fi * 1.99 + (time * 0.52) * 0.49)) * (0.023 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 1.008, 1.020) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
