uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.53) * p;
	vec3 col = vec3(0.024, 0.010, 0.068);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.40 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 1.58 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.62;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.33 + time * 0.74)) * (0.025 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
