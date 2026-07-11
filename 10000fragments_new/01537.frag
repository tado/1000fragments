uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p = rot2(time * 0.94) * p;
	vec3 col = vec3(0.031, 0.035, 0.077);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.54 + time * 1.25), sin(fi * 1.54 + time * 1.25)) * (0.79 + 0.33 * sin(fi * 1.7 + time * 1.74));
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.57 + time * 1.44)) * (0.015 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
