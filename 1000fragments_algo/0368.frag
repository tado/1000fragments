uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.60;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.73) * 0.79) * p;
	vec3 col = vec3(0.033, 0.022, 0.055);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.73) * 0.83 * (0.3 + fi * 0.14) + fi * 2.4), cos((time * 0.73) * 0.55 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.77;
		vec2 bq = abs(p - q) - vec2(0.17, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.64, 1.28) + fi * 1.52 + (time * 0.73) * 0.43)) * (0.020 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.34));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.982, 1.030) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
