uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	p = rot2(time * -0.58) * p;
	vec3 col = vec3(0.058, 0.054, 0.075);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.26 + time * 1.70), sin(fi * 1.26 + time * 1.70)) * (0.40 + 0.11 * sin(fi * 1.7 + time * 1.60));
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.92 + time * 1.17)) * (0.019 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
