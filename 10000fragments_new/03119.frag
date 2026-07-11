uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.85) * p;
	vec3 col = vec3(0.013, 0.031, 0.072);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.54 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 1.07 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.97;
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.91 + time * 0.91)) * (0.033 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
