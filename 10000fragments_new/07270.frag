uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.30) * p;
	vec3 col = vec3(0.046, 0.017, 0.055);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.19 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.40 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.65;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.38 + time * 1.21)) * (0.032 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.56 + time * 12.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
