uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	p = rot2(time * -0.80) * p;
	vec3 col = vec3(0.021, 0.030, 0.027);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.97 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.98 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.50;
		vec2 bq = abs(p - q) - vec2(0.14, 0.08);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.71 + time * 1.03)) * (0.027 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.98 + time * 6.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
