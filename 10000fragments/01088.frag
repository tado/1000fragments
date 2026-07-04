uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.31) * p;
	vec3 col = vec3(0.026, 0.020, 0.069);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.75 + time * 0.75), sin(fi * 1.75 + time * 0.75)) * (0.48 + 0.34 * sin(fi * 1.7 + time * 1.58));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.66 + time * 0.55)) * (0.036 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
