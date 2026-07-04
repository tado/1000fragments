uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.99) * p;
	vec3 col = vec3(0.041, 0.058, 0.065);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.74 + time * 0.65), sin(fi * 0.74 + time * 0.65)) * (0.63 + 0.19 * sin(fi * 1.7 + time * 2.00));
		float gd = abs(length(p - q) - 0.08);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.90 + time * 0.88)) * (0.013 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
