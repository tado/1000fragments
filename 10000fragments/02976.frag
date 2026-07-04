uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.78) * p;
	vec3 col = vec3(0.002, 0.052, 0.046);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.32 + time * 1.10), sin(fi * 1.32 + time * 1.10)) * (0.36 + 0.18 * sin(fi * 1.7 + time * 1.47));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.98 + time * 0.79)) * (0.009 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
