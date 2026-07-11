uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p = rot2(time * 1.31) * p;
	vec3 col = vec3(0.015, 0.034, 0.032);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.48 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 0.53 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.69;
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.44 + time * 0.53)) * (0.022 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
