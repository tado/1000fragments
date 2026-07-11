uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.92;
	p = rot2(time * 1.60) * p;
	vec3 col = vec3(0.013, 0.054, 0.047);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.44 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.74 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.59;
		vec2 bq = abs(p - q) - vec2(0.08, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.70 + time * 0.62)) * (0.019 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
