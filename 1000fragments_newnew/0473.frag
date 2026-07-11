uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	vec3 col = vec3(0.021, 0.014, 0.000);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.78) * 1.54 * (0.3 + fi * 0.20) + fi * 2.4), cos((time * 0.78) * 1.24 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.88;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.89, 1.78) + fi * 1.63 + (time * 0.78) * 0.29)) * (0.013 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.974, 1.027) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
