uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p = rot2(time * -1.14) * p;
	vec3 col = vec3(0.055, 0.025, 0.030);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.22 + time * 1.95), sin(fi * 1.22 + time * 1.95)) * (0.68 + 0.16 * sin(fi * 1.7 + time * 1.78));
		float gd = abs(length(p - q) - 0.26);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.04 + time * 0.41)) * (0.023 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
