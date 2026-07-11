uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.59) * 0.92), cos((time * 0.59) * 0.82)) * 0.09;
	p.x += p.y * 0.57;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = rot2((time * 0.59) * -1.26) * p;
	vec3 col = vec3(0.001, 0.040, 0.071);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.59) * 1.09 * (0.3 + fi * 0.16) + fi * 2.4), cos((time * 0.59) * 0.49 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.95;
		float gd = abs(length(p - q) - 0.08);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.18) + fi * 1.21 + (time * 0.59) * 1.11)) * (0.023 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.989, 1.016) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
