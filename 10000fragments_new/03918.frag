uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.36) * p;
	vec3 col = vec3(0.007, 0.058, 0.004);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.58 + time * 1.20), sin(fi * 0.58 + time * 1.20)) * (0.44 + 0.37 * sin(fi * 1.7 + time * 0.71));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.01 + time * 0.84)) * (0.033 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 1.45 + time * 4.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
