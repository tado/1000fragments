uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.90) * p;
	vec3 col = vec3(0.028, 0.027, 0.017);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.12 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.95 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.83;
		vec2 bq = abs(p - q) - vec2(0.17, 0.16);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.63 + time * 0.53)) * (0.022 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
