uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * 0.89) * p;
	vec3 col = vec3(0.015, 0.024, 0.059);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.62 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 0.48 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.62;
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.43 + time * 0.92)) * (0.026 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
