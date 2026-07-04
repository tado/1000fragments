uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	p = rot2(time * -0.96) * p;
	vec3 col = vec3(0.019, 0.034, 0.035);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.09 + time * 0.86), sin(fi * 2.09 + time * 0.86)) * (0.77 + 0.17 * sin(fi * 1.7 + time * 1.30));
		float gd = abs(length(p - q) - 0.30);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.48 + time * 1.11)) * (0.030 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
