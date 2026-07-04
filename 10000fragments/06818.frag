uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.32) * p;
	vec3 col = vec3(0.049, 0.011, 0.025);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.05 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 1.43 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.48;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.11 + time * 0.77)) * (0.013 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
