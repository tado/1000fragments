uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	p = rot2(time * -1.28) * p;
	vec3 col = vec3(0.045, 0.046, 0.017);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.37 + time * 2.42), sin(fi * 2.37 + time * 2.42)) * (0.37 + 0.37 * sin(fi * 1.7 + time * 1.22));
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.86 + time * 0.24)) * (0.014 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
