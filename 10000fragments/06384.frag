uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.15) * p;
	vec3 col = vec3(0.015, 0.001, 0.022);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.66 + time * 2.04), sin(fi * 1.66 + time * 2.04)) * (0.61 + 0.11 * sin(fi * 1.7 + time * 1.99));
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.73 + time * 1.18)) * (0.022 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
