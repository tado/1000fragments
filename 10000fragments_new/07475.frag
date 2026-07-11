uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	p = rot2(time * -0.34) * p;
	vec3 col = vec3(0.033, 0.056, 0.059);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.05 + time * 1.42), sin(fi * 2.05 + time * 1.42)) * (0.71 + 0.26 * sin(fi * 1.7 + time * 0.52));
		vec2 bq = abs(p - q) - vec2(0.22, 0.05);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.32 + time * 0.25)) * (0.023 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.08, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
