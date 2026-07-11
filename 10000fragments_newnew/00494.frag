uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.00;
	p = rot2(time * 1.48) * p;
	vec3 col = vec3(0.058, 0.015, 0.007);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.48 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 1.00 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.51;
		vec2 bq = abs(p - q) - vec2(0.10, 0.13);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.92 + time * 0.47)) * (0.014 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
