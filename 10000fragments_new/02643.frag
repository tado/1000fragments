uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.33) * p;
	vec3 col = vec3(0.024, 0.011, 0.064);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.20 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 0.76 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.55;
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.85 + time * 1.41)) * (0.040 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
