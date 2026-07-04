uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p = rot2(time * 0.35) * p;
	vec3 col = vec3(0.051, 0.009, 0.011);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.05 + time * 2.18), sin(fi * 1.05 + time * 2.18)) * (0.62 + 0.32 * sin(fi * 1.7 + time * 1.24));
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.95 + time * 0.48)) * (0.030 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
