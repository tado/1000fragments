uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p += vec2(sin((time * 0.65) * 0.80), cos((time * 0.65) * 0.66)) * 0.11;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.051, 0.023, 0.003);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.93 + (time * 0.65) * 1.03), sin(fi * 1.93 + (time * 0.65) * 1.03)) * (0.79 + 0.28 * sin(fi * 1.7 + (time * 0.65) * 0.58));
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.05, 2.10) + fi * 0.95 + (time * 0.65) * 0.97)) * (0.029 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.059, 1.006, 0.913) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
