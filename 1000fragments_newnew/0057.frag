uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.034, 0.038, 0.024);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.63) * 0.46 * (0.3 + fi * 0.08) + fi * 2.4), cos((time * 0.63) * 1.09 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.81;
		float gd = abs(length(p - q) - 0.26);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.46, 0.92) + fi * 1.41 + (time * 0.63) * 1.28)) * (0.038 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 0.996, 0.925) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
