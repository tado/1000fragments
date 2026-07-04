uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	p = rot2(time * 0.98) * p;
	vec3 col = vec3(0.055, 0.035, 0.039);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.86 + time * 1.30), sin(fi * 1.86 + time * 1.30)) * (0.62 + 0.21 * sin(fi * 1.7 + time * 0.57));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.48 + time * 0.75)) * (0.023 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
