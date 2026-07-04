uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.74) * p;
	vec3 col = vec3(0.046, 0.000, 0.026);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.26 + time * 0.75), sin(fi * 1.26 + time * 0.75)) * (0.65 + 0.22 * sin(fi * 1.7 + time * 1.18));
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.71 + time * 0.79)) * (0.020 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
