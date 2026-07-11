uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * -1.41) * p;
	vec3 col = vec3(0.055, 0.043, 0.039);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.26 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 1.03 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.82;
		vec2 bq = abs(p - q) - vec2(0.14, 0.12);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 2.00 + time * 1.36)) * (0.029 / (gd + 0.022));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
