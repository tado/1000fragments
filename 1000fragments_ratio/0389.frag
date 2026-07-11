uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.71) * 0.34), cos((time * 0.71) * 0.95)) * 0.06;
	p *= 1.20;
	vec3 col = vec3(0.019, 0.056, 0.020);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.71) * 1.37 * (0.3 + fi * 0.14) + fi * 2.4), cos((time * 0.71) * 0.72 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.61;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.98, 1.95) + fi * 0.46 + (time * 0.71) * 0.22)) * (0.011 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 1.025, 0.959) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
