uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.45) * p;
	vec3 col = vec3(0.016, 0.005, 0.006);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.43 + time * 1.15), sin(fi * 1.43 + time * 1.15)) * (0.45 + 0.26 * sin(fi * 1.7 + time * 1.00));
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.86 + time * 0.84)) * (0.025 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
