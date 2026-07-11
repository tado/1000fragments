uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.09) * p;
	vec3 col = vec3(0.055, 0.026, 0.010);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.26 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 1.01 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.74;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.86 + time * 0.57)) * (0.031 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
