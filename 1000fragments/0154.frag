uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	p = rot2(time * 1.52) * p;
	vec3 col = vec3(0.010, 0.037, 0.028);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.39 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 1.02 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.46;
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.78 + time * 0.79)) * (0.029 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
