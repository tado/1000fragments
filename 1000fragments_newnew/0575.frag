uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	vec3 col = vec3(0.059, 0.050, 0.009);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.65) * 0.42 * (0.3 + fi * 0.11) + fi * 2.4), cos((time * 0.65) * 1.36 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.91;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.79, 1.58) + fi * 1.86 + (time * 0.65) * 0.25)) * (0.018 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 1.38 + (time * 0.65) * 13.98);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.018, 1.017) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
