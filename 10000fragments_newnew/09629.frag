uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	p = rot2(time * -1.31) * p;
	vec3 col = vec3(0.006, 0.049, 0.011);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.58 * (0.3 + fi * 0.05) + fi * 2.4), cos(time * 0.90 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.73;
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.16 + time * 1.37)) * (0.020 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
