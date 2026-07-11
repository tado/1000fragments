uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p = rot2(time * -1.30) * p;
	vec3 col = vec3(0.027, 0.032, 0.028);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.12 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 0.86 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.49;
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.97 + time * 1.39)) * (0.010 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
