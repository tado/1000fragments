uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	p = rot2(time * 1.04) * p;
	vec3 col = vec3(0.025, 0.017, 0.035);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.41 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 0.92 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.82;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 2.00 + time * 0.34)) * (0.034 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
