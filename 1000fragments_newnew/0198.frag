uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.013, 0.038, 0.022);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.80) * 1.47 * (0.3 + fi * 0.19) + fi * 2.4), cos((time * 0.80) * 0.81 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.50;
		vec2 bq = abs(p - q) - vec2(0.16, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.79, 1.59) + fi * 0.89 + (time * 0.80) * 0.75)) * (0.015 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 0.967, 1.012) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
