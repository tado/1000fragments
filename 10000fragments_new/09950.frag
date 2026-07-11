uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p = rot2(time * -1.45) * p;
	vec3 col = vec3(0.018, 0.017, 0.007);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.50 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.76 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.93;
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 0.96)) * (0.038 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
