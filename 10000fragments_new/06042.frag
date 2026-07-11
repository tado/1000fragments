uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	p = rot2(time * 1.58) * p;
	vec3 col = vec3(0.058, 0.004, 0.008);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.68 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 1.22 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.63;
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.76 + time * 0.60)) * (0.026 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
