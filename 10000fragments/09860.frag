uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.70) * p;
	vec3 col = vec3(0.050, 0.004, 0.044);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.51 + time * 1.18), sin(fi * 0.51 + time * 1.18)) * (0.56 + 0.15 * sin(fi * 1.7 + time * 1.95));
		vec2 bq = abs(p - q) - vec2(0.12, 0.14);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.88 + time * 0.33)) * (0.021 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
