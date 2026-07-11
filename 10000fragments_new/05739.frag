uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.80;
	p = rot2(time * -0.33) * p;
	vec3 col = vec3(0.006, 0.051, 0.064);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.70 + time * 2.40), sin(fi * 1.70 + time * 2.40)) * (0.44 + 0.34 * sin(fi * 1.7 + time * 1.74));
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.12 + time * 1.12)) * (0.039 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
