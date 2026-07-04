uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	p = rot2(time * 1.06) * p;
	vec3 col = vec3(0.023, 0.013, 0.011);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.99 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 1.46 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.59;
		vec2 bq = abs(p - q) - vec2(0.10, 0.12);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.72 + time * 0.83)) * (0.019 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
