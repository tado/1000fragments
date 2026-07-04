uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	p = rot2(time * 0.45) * p;
	vec3 col = vec3(0.051, 0.016, 0.035);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.45 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.59 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.91;
		vec2 bq = abs(p - q) - vec2(0.23, 0.17);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.86 + time * 0.76)) * (0.039 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.91 + time * 13.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
