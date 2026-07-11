uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p = rot2(time * 1.43) * p;
	vec3 col = vec3(0.002, 0.044, 0.042);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.06 + time * 1.03), sin(fi * 2.06 + time * 1.03)) * (0.30 + 0.29 * sin(fi * 1.7 + time * 1.70));
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 0.36)) * (0.011 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
