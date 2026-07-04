uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	p = rot2(time * -1.06) * p;
	vec3 col = vec3(0.013, 0.010, 0.059);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.52 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 0.49 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.51;
		vec2 bq = abs(p - q) - vec2(0.11, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.23 + time * 0.49)) * (0.036 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
