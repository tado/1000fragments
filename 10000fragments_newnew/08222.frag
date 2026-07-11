uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p = rot2(time * -1.31) * p;
	vec3 col = vec3(0.053, 0.013, 0.053);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.82 * (0.3 + fi * 0.11) + fi * 2.4), cos(time * 0.72 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.50;
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.46 + time * 0.68)) * (0.026 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
