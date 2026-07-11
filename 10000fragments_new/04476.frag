uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.04) * p;
	vec3 col = vec3(0.002, 0.032, 0.019);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.69 + time * 1.37), sin(fi * 0.69 + time * 1.37)) * (0.63 + 0.30 * sin(fi * 1.7 + time * 1.25));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.63 + time * 0.49)) * (0.021 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 1.74 + time * 13.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
