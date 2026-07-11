uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.45;
	p = rot2(time * -1.11) * p;
	vec3 col = vec3(0.000, 0.045, 0.055);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.43 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 1.15 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.64;
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.69 + time * 1.29)) * (0.012 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
