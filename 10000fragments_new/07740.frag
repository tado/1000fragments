uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = rot2(time * -0.61) * p;
	vec3 col = vec3(0.037, 0.014, 0.031);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.18 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 0.89 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.56;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.70 + time * 0.79)) * (0.017 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 2.73 + time * 4.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
