uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.50) * p;
	vec3 col = vec3(0.024, 0.029, 0.001);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.77 + time * 1.24), sin(fi * 0.77 + time * 1.24)) * (0.43 + 0.38 * sin(fi * 1.7 + time * 1.20));
		float gd = abs(length(p - q) - 0.19);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.17 + time * 0.39)) * (0.028 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
