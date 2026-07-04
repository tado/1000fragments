uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.45) * p;
	vec3 col = vec3(0.050, 0.032, 0.039);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.04 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 1.34 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.61;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.40 + time * 0.69)) * (0.009 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
