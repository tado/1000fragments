uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.87) * p;
	vec3 col = vec3(0.016, 0.008, 0.045);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.51 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 1.14 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.99;
		vec2 bq = abs(p - q) - vec2(0.12, 0.07);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.92 + time * 0.35)) * (0.023 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
