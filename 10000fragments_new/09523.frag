uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	p = rot2(time * 0.60) * p;
	vec3 col = vec3(0.005, 0.026, 0.007);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.82 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 0.71 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.70;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.05 + time * 1.10)) * (0.032 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 0.86 + time * 4.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
