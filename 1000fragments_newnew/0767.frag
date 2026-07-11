uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	vec3 col = vec3(0.020, 0.020, 0.059);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.58) * 1.07 * (0.3 + fi * 0.15) + fi * 2.4), cos((time * 0.58) * 0.42 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.99;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.05, 2.10) + fi * 1.57 + (time * 0.58) * 1.35)) * (0.034 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 0.979, 0.936) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
